import { useState } from 'react';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authentication } from '../../config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userdata';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Login({
  log,
  setlog,
  sig,
  setsig,
  render,
}: {
  log: boolean;
  setlog: any;
  sig: boolean;
  setsig: any;
  render: any;
}) {
  const tabindex: number = 1;
  const maxlength: number = 30;
  const history = useNavigate();

  // All the below mentioned methods are for otp login with firebase authentication
  const generateRecaptcha = () => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      authentication,
      'recaptcha',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
    );
  };

  const verifyotp = () => {
    generateRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;
    signInWithPhoneNumber(authentication, `+91${phone}`, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        (window as any).confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  };

  const checkotp = () => {
    if (uotp.length == 6) {
      const res = (window as any).confirmationResult;
      res.confirm(uotp).then((result) => {
        console.log('done');
        getuser(phone);
        render(false);
        history('/dashboard');
        return true;
      });
    }
    return true;
  };

  // All useState methods
  const [phone, setphone] = useState('');
  const [anim, setanim] = useState(false);
  const [sotp, showsotp] = useState(false);
  const [uotp, setuotp] = useState('');
  const [logp, setlogp] = useState(true);

  // for toastr
  const otp = () =>
    toast.success('Check for OTP', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  // Dealing with Redux User updation
  const dispatch = useDispatch();
  const getuser = async (phone: string) => {
    console.log(phone);
    try {
      const userCollection = collection(db, 'users');
      const q = query(userCollection, where('phone', '==', phone));
      const resuser = await getDocs(q);
      if (!resuser.empty) {
        const userDoc = resuser.docs[0];

        const userData = userDoc.data();
        handlereduxuserupdate(userData);
        console.log(userData.name, userData.email);
      }
    } catch (err) {
      console.log(err);
    }
  };
  function handlereduxuserupdate(data) {
    const userObj = {
      name: data.name,
      email: data.email,
    };
    dispatch(login(userObj));
  }
  // Real component rendering
  if (!log) return <></>;
  return (
    <>
      <div
        className={`_3vi_e ${anim ? '_3vi_e1' : ''} snipcss-ZCPCY style-hNGBQ `}
        id="style-hNGBQ"
      >
        <div className="_12S7_">
          <div className="">
            <div id="style-3Poxs" className="style-3Poxs">
              <div className="_3pYe- style-iBTBw" id="style-iBTBw">
                <span
                  className="_22fFW icon-close-thin"
                  onClick={() => {
                    setanim(true);
                    setTimeout(() => {
                      setlog(false);
                      setanim(false);
                      showsotp(false);
                    }, 500);
                  }}
                ></span>
                <div className="_1Tg1D">Login</div>
                <div className="HXZeD"></div>
                <div className="_2r91t">
                  or &nbsp;
                  <a
                    className="_3p4qh"
                    onClick={() => {
                      setlog(false);
                      setsig(true);
                    }}
                  >
                    create an account
                  </a>
                </div>
                <img
                  className="_2tuBw _12_oN jdo4W"
                  width="100"
                  height="105"
                  alt=""
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                />
              </div>
              <form>
                <div>
                  <div className="_3Um38 _3lG1r">
                    <input
                      className="_381fS"
                      type="tel"
                      name="mobile"
                      id="mobile"
                      tabIndex={tabindex}
                      maxLength={maxlength}
                      autoComplete="off"
                      onChange={(e) => {
                        setphone(e.target.value);
                      }}
                      value={phone}
                    />
                    <div className="_2EeI1 _26LFr"></div>
                    <label className="_1Cvlf _2tL9P " htmlFor="mobile">
                      Phone number
                    </label>
                  </div>
                  {sotp && (
                    <div className="_3Um38 _3lG1r">
                      <input
                        className="_381fS"
                        type="tel"
                        name="mobile"
                        id="mobile"
                        tabIndex={tabindex}
                        maxLength={maxlength}
                        autoComplete="off"
                        onChange={(e) => {
                          setuotp(e.target.value);
                        }}
                        value={uotp}
                      />
                      <div className="_2EeI1 _26LFr"></div>
                      <label className="_1Cvlf _2tL9P " htmlFor="mobile">
                        OTP
                      </label>
                    </div>
                  )}
                  <div id="recaptcha"></div>
                </div>
                <div className="_25qBi _2-hTu">
                  {logp && (
                    <button
                      className="a-ayg style-Zeozo"
                      onClick={() => {
                        setlogp(false);
                        showsotp(true);
                        otp();
                        verifyotp(); //
                      }}
                    >
                      Login
                    </button>
                  )}
                  {!logp && (
                    <button
                      className="a-ayg style-Zeozo"
                      onClick={() => {
                        checkotp();

                        setlogp(true);
                        setlog(false);
                      }}
                    >
                      Verify OTP
                    </button>
                  )}

                  <ToastContainer />
                </div>

                <div className="_1FvHn">
                  By clicking on Login, I accept the &nbsp;
                  <a className="IBw2l" href="/terms-and-conditions">
                    Terms &amp; Conditions &nbsp;
                  </a>
                  &amp; &nbsp;
                  <a className="IBw2l" href="/privacy-policy">
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

export default Login;
