import { useState } from 'react';
import './signup.css';
// import Login from '../login/login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';



//Again similar to login.tsx, I have to pass the props from App.tsx to this component

function SignUp({
  sig,
  setsig,

  setlog,
}: {
  sig: boolean;
  setsig: React.Dispatch<React.SetStateAction<boolean>>;
  setlog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [phone, setphone] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [anim, setanim] = useState(false);

  const firebasesignin = async () => {
    try {
      await addDoc(collection(db, 'users'), {
        name,
        email,
        phone,
      });
    } catch (error) {
      console.log('Error');
    }
  };
  //The above method is for adding the user data to firestore database

  const signin = () =>
    toast.success('Sign-In successful, Login to Continue', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  //The above method is for toastr


  if (!sig) return <></>;
  return (
    <>
      <div
        className={`_3vi_e ${
          anim ? '_3vi_e1' : ''
        } snipcss0-0-0-1 snipcss-V2oY3 style-JhwGM`}
        id="style-JhwGM"
      >
        <div className="_12S7_ snipcss0-1-1-2">
          <div className="snipcss0-2-2-3">
            <div className="snipcss0-3-3-4 style-XpqPO" id="style-XpqPO">
              <div
                className="_3pYe- snipcss0-4-4-5 style-yO2SC"
                id="style-yO2SC"
              >
                <span
                  className="_22fFW icon-close-thin snipcss0-5-5-6"
                  onClick={() => {
                    setanim(true);
                    setTimeout(() => {
                      setsig(false);
                      setanim(false);
                    }, 500);
                  }}
                ></span>
                <div className="_1Tg1D snipcss0-5-5-7">Sign up</div>
                <div className="HXZeD snipcss0-5-5-8"></div>
                <div className="_2r91t snipcss0-5-5-9">
                  or &nbsp;
                  <a
                    className="_3p4qh snipcss0-6-9-10"
                    onClick={() => {
                      setsig(false);
                      setlog(true);
                    }}
                  >
                    login to your account
                  </a>
                </div>
                <img
                  className="_2tuBw _12_oN jdo4W snipcss0-5-5-11"
                  width="100"
                  height="105"
                  alt=""
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                />
              </div>
              <form className="snipcss0-4-4-12">
                <div className="snipcss0-5-12-13">
                  <div className="_3Um38 _3lG1r snipcss0-6-13-14">
                    <input
                      className="_381fS snipcss0-7-14-15"
                      type="tel"
                      name="mobile"
                      id="mobile"

                      autoComplete="off"
                      onChange={(e) => {
                        setphone(e.target.value);
                      }}
                      value={phone}
                    />
                    <div className="_2EeI1 _26LFr snipcss0-7-14-16"></div>
                    <label
                      className="_1Cvlf _2tL9P snipcss0-7-14-17"
                      htmlFor="mobile"
                    >
                      Phone number
                    </label>
                  </div>
                  <div className="_3Um38 _3lG1r snipcss0-6-13-18">
                    <input
                      className="_381fS snipcss0-7-18-19"
                      type="text"
                      name="name"
                      id="name"

                      autoComplete="off"
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                      value={name}
                    />
                    <div className="_2EeI1 snipcss0-7-18-20"></div>
                    <label
                      className="_1Cvlf _2tL9P snipcss0-7-14-17"
                      htmlFor="name"
                    >
                      Name
                    </label>
                  </div>
                  <div className="_3Um38 _3lG1r snipcss0-6-13-22">
                    <input
                      className="_381fS snipcss0-7-22-23"
                      type="email"
                      name="email"
                      id="email"

                      autoComplete="off"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      value={email}
                    />
                    <div className="_2EeI1 snipcss0-7-22-24"></div>
                    <label
                      className="_1Cvlf _2tL9P snipcss0-7-14-17"
                      htmlFor="email"
                    >
                      Email
                    </label>
                  </div>
                </div>
                <div className="_25qBi _2-hTu snipcss0-5-12-27">
                  <a
                    className="a-ayg snipcss0-6-27-28"
                    onClick={() => {
                      signin();
                      firebasesignin();
                      setTimeout(() => {
                        setsig(false);
                        setlog(true);
                      }, 1000);
                    }}
                  >
                    <input
                      type="submit"
                      className="snipcss0-7-28-29 style-Wgm1t"
                      id="style-Wgm1t"
                    />
                    CONTINUE
                  </a>
                </div>
                <ToastContainer />;
                <div className="_1FvHn snipcss0-5-12-30">
                  By creating an account, I accept the &nbsp;
                  <a
                    className="IBw2l snipcss0-6-30-31"
                    href="/terms-and-conditions"
                  >
                    Terms &amp; Conditions &nbsp;
                  </a>
                  &amp; &nbsp;
                  <a className="IBw2l snipcss0-6-30-32" href="/privacy-policy">
                    Privacy Policy
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
