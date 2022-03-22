
import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, withdraw, lodgement, transfer } from "../redux/actions";
import  jwtGen from "../utils"

const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [LodgementAmount, setLodgementAmount] = useState('')
  const [receiver_username, setReceiver_username] = useState('')
  const [tansfer_amount, setTansfer_amount] = useState('')

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

   const userDetails = useSelector((state) => state.userDetails);
  const { user, loading : userDetailsloading, error : userDetailsError } = userDetails;

  const withdrawal = useSelector((state) => state.withdrawal);
  const { success: withdrawalSuccess, loading: withdrawalLoading, error: withdrawalError } = withdrawal;
  
  const lodgementState = useSelector((state) => state.lodgement);
  const { success: lodgementSuccess, loading: lodgementLoading, error: lodgementError } = lodgementState;
  
  const transferState = useSelector((state) => state.transfer);
  const { success :transferSuccess, loading :  transferLoading, error : transferError } = transferState;

  console.log(transferSuccess, "transferSuccess")

  const withdrawHandler = () => {
    const amount = jwtGen(withdrawalAmount);
    dispatch(withdraw(amount))
    setWithdrawalAmount('')
  }

  const lodgmentHandler = () => {
    console.log(LodgementAmount, "LodgementAmount")
    const amount = jwtGen(LodgementAmount);
    dispatch(lodgement(amount))
    setLodgementAmount('')
  }

  const transferHandler = () => {
    console.log( receiver_username, tansfer_amount, " receiver_username, tansfer_amount")
    const payload = jwtGen({ receiver_username, tansfer_amount })
    dispatch(transfer(payload))
    setReceiver_username('')
    setTansfer_amount('')
  }

  console.log(userDetailsError, "userDetailsError")
  
  useEffect(() => {

    dispatch(getUserDetails())
    // if (!userInfo) {
    //  // navigate('/login')
    // } else {
    //   dispatch(getUserDetails())
    // } 
  }, [ withdrawalSuccess, lodgementSuccess, transferSuccess]);


  return (
    <div className='main-body'>
      <Header />
      <main className='main-section'>
        <section className="user-details">
          <section className="cover">
            <div className='transaction-cover pb-3'>
              <h4  align='center'>User Details</h4>
              { userInfo && (
                <>
                <p>Name : { userInfo?.data?.first_name } { userInfo?.data?.last_name }</p>
                <p>Email : { userInfo?.data?.email }</p>
                  <p>Username : { userInfo?.data?.username }</p>
                </>
              ) }
            </div>
            
            <div className='transaction-cover pb-3'>
              <h4  align='center'>Wallet</h4>
            <>
              <p>Balence: { user?.data?.wallet[0]?.currency } { user?.data?.wallet[0]?.balance }</p>
              <p>Wallet Id: { user?.data?.wallet[0]?.wallet_id }</p>
              <p>Date Created: { user?.data?.wallet[0]?.created_date.slice(0,10) }</p>
            </>
            </div>
          </section>
          <section className="cover transactions">
            <h4  align='center'>Transactions</h4>
            { user?.data?.transactions.length === 0 ? <div> No transactions</div> :  user?.data?.transactions.map((transaction) => (
              <div className='transaction-cover pt-2 pb-2' id={transaction.id}>
                <p className={transaction.debit_amount ? "color-red" : "color-green"}>{ transaction.debit_amount ? "Debit amount" : "Credit amount" } { " " }{ transaction.debit_amount ? transaction.debit_amount : transaction.credit_amount }</p>
                <p>{ transaction.sender_id ? `Sender Id: ${transaction.sender_id}` : "" }</p>
                 <p>{ transaction.receiver_id ? `Receiver Id: ${transaction.receiver_id}` : ""}</p>
                <p>Transaction Type: { transaction.transaction_type }</p>
              </div>
            )) }
           </section>
          <section className="cover">
            <h4 align='center'>Transfer</h4>
            {transferSuccess && <p className="color-green" align="center">Transfer successful</p>}
            {transferError && <p className="color-red" align="center">{transferError}</p>}
            {transferLoading && "Sending ......"}
            <form
              
          action=""
          className="customer-signin-form"
        >
          <div className="customer-signin-form-group">
            <input
              type="text"
              className="customer-signin-form-input"
              placeholder="Reciever username"
              required
              value={receiver_username}
              onChange={(e) => setReceiver_username(e.target.value)}
            />
          </div>

              <div className="customer-signin-form-group">
            <input
              type="number"
              className="customer-signin-form-input"
              placeholder="Amount"
              required
              value={tansfer_amount}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);
                if (isNaN(val)) {
                  setTansfer_amount("");
                } else {
                  val = val >= 0 ? val : 0;
                  setTansfer_amount(val);
                }
              }}
                  
            />
          </div>
          <div className="customer-signin-form-group">
            <button type="submit" onClick={transferHandler} className="customer-signin-btn">
              Transfer
            </button>
          </div>
            </form>
          </section>
        </section>

        <section className="account-details">
          <section className="cover">
          <h4 align='center'>Fund Account</h4>
                {lodgementSuccess && <p className="color-green" align="center">Deposit successful</p>}
                {lodgementError && <p className="color-red" align="center">{lodgementError}</p>}
                {transferLoading && "Sending ......"}
          <form action=""  className="customer-signin-form" >
          <div className="customer-signin-form-group">
            <input
              type="number"
              className="customer-signin-form-input"
              placeholder="Amount"
              required
              value={LodgementAmount}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);
                if (isNaN(val)) {
                  setLodgementAmount("");
                } else {
                  // is A Number
                  val = val >= 0 ? val : 0;
                  setLodgementAmount(val);
                }
              }}
            />
          </div>
          <div className="customer-signin-form-group">
            <button type="submit" onClick={lodgmentHandler} className="customer-signin-btn">
             Fund Account
            </button>
          </div>
            </form>
          </section>
          <section className="cover">
            <h4 align='center'>Withdrawal</h4>
             {withdrawalSuccess && <p className="color-green" align="center">Withdrawal successful</p>}
            {withdrawalError && <p className="color-red" align="center">{withdrawalError}</p>}
            {transferLoading && "Sending ......"}
                <form
              action=""
              
              className="customer-signin-form"
            >
          <div className="customer-signin-form-group">
            <input
              type="number"
              className="customer-signin-form-input"
              placeholder="Amount"
              required
              value={withdrawalAmount}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);
                if (isNaN(val)) {
                  setWithdrawalAmount("");
                } else {
                  // is A Number
                  val = val >= 0 ? val : 0;
                  setWithdrawalAmount(val);
                }
              }}
            />
          </div>
          <div className="customer-signin-form-group">
            <button type="submit" onClick={withdrawHandler} className="customer-signin-btn">
             Withdraw
            </button>
          </div>
            </form>
          </section>
          <section className="cover">
            
          </section>
        </section>
       </main>
      <Footer/>
    </div>
      
  )
}

export default Dashboard