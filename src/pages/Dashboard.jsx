
import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, withdraw, lodgement } from "../redux/actions";
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
  const { user, loading : userDetailsloading, error : userDetailserror } = userDetails;

  const withdrawal = useSelector((state) => state.withdrawal);
  const { success: withdrawalSuccess, loading: withdrawalLoading, error: withdrawalError } = withdrawal;
  
  const lodgementState = useSelector((state) => state.lodgement);
  const { success :lodgementSuccess, loading :  lodgementLoading, error : lodgementError } = lodgementState;

  const withdrawHandler = () => {
    const amount = jwtGen(withdrawalAmount);
    dispatch(withdraw(amount))
    setWithdrawalAmount('')
  }

  const lodgmentHandler = () => {
    const amount = jwtGen(LodgementAmount);
    dispatch(lodgement(amount))
    setLodgementAmount('')
  }

   const transferHandler = () => {
    console.log("fdfdf")
   }
  
  
  

  useEffect(() => {
    if (!userInfo) {
    navigate('/login')
    } else {
      dispatch(getUserDetails())
    }
  }, [userInfo, withdrawalSuccess, lodgementSuccess]);


  return (
    <div className='main-body'>
      <Header />
      <main className='main-section'>
        <section className="user-details">
          <section className="cover">
            <h4  align='center'>User Details</h4>
            { userInfo && (
              <>
              <p>Name : { userInfo?.data?.first_name } { userInfo?.data?.last_name }</p>
              <p>Email : { userInfo?.data?.email }</p>
                <p>Username : { userInfo?.data?.username }</p>
              </>
            )}
          </section>
          <section className="cover">
            <h4  align='center'>Transactions</h4>
            { user?.data?.transactions.length === 0 ? <div> No transactions</div> :  user?.data?.transactions.map((transaction) => (
              <div>
                {/* currency(pin):"NGN"
                sender_id(pin):"ddccddd"
                receiver_id(pin):"vdd"
                transaction_type(pin):"Withdrawal" */}
                <p>{ transaction.debit_amount ? "Debit amount" : "Credit amount" } {" "}{ transaction.debit_amount  ? transaction.debit_amount : transaction.credit_amount }</p>
              </div>
            )) }
           </section>
          <section className="cover">
            <h4  align='center'>Wallet</h4>
            <>
              <p>{ user?.data?.wallet[0]?.currency } { user?.data?.wallet[0]?.balance }</p>
              <p>{ user?.data?.wallet[0]?.wallet_id }</p>
              <p>{ user?.data?.wallet[0]?.created_date.slice(0,10) }</p>
            </>
          </section>
        </section>

        <section className="account-details">
          
          <section className="cover">
                <h4 align='center'>Fund Account</h4>
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
              value={LodgementAmount}
              onChange={(e) => setLodgementAmount(e.target.value)}
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
              onChange={(e) => setWithdrawalAmount(e.target.value)}
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
            <h4 align='center'>Transfer</h4>
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
              placeholder="Amout"
              required
              value={tansfer_amount}
              onChange={(e) => setTansfer_amount(e.target.value)}
            />
          </div>
          <div className="customer-signin-form-group">
            <button type="submit" onClick={transferHandler} className="customer-signin-btn">
              Transfer
            </button>
          </div>
        </form></section>
        </section>
       </main>
      <Footer/>
    </div>
      
  )
}

export default Dashboard