import { useContext } from 'react';
import { NextImage } from '@components/ui/next-image';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import { MetaMaskContext, MetamaskActions } from '@lib/context/metamask-context';
import {
  connectSnap,
  getSnap
} from '@lib/utils/snap';

export function LoginMain(): JSX.Element {

  const [state, dispatch] = useContext(MetaMaskContext);
  
  function openMetamaskFlask() {
    window.open("https://metamask.io/flask/", "_blank");
  }

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <main className='grid lg:grid-cols-[1fr,45vw]'>
      <div className='relative hidden items-center justify-center  lg:flex'>
        <NextImage
          imgClassName='object-cover'
          blurClassName='bg-accent-blue'
          src='/assets/twitter-banner.png'
          alt='Twitter banner'
          layout='fill'
          useSkeleton
        />
        <i className='absolute'>
          <CustomIcon className='h-96 w-96 text-white' iconName='TwitterIcon' />
        </i>
      </div>
      <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
        <i className='mb-0 self-center lg:mb-10 lg:self-auto'>
          <CustomIcon
            className='-mt-4 h-6 w-6 text-accent-blue lg:h-12 lg:w-12 dark:lg:text-twitter-icon'
            iconName='TwitterIcon'
          />
        </i>
        <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
          <h1
            className='text-3xl before:content-["See_what’s_happening_in_the_world_right_now."] 
                       lg:text-6xl lg:before:content-["Happening_now"]'
          />
          {/* <h2 className='hidden text-xl lg:block lg:text-3xl'>
            Join Twitter today.
          </h2> */}
          {state.error && (
            <p
              className='inner:custom-underline inner:custom-underline text-center text-xs
                      text-light-secondary inner:text-accent-blue dark:text-dark-secondary'>
              <b>An error happened:</b>{state.error.message}
            </p>
          )}
        </div>
        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div className='grid gap-3 font-bold'>

            {!state.isFlask && (
              <>
                  <Button
                    className='flex justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                              hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                              dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
                    onClick={openMetamaskFlask}
                  >
                  {/* <FlaskFox /> Connect */}
                    <CustomIcon iconName='FlaskFox' />Install MetaMask Flask
                  </Button>
                  <p
                  className='inner:custom-underline inner:custom-underline text-center text-xs
                            text-light-secondary inner:text-accent-blue dark:text-dark-secondary'
                  >Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.
                  </p>

                  <div className='grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2'>
                    <i className='border-b border-light-border dark:border-dark-border' />
                    <p>-</p>
                    <i className='border-b border-light-border dark:border-dark-border' />
                  </div> 
              </>
            )}
            {!state.installedSnap && (
              <>
                <Button
                  className='flex justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                            hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                            dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
                  onClick={handleConnectClick}
                  disabled={!state.isFlask}
                >
                {/* <FlaskFox /> Connect */}
                  <CustomIcon iconName='FlaskFox' />Connect
                </Button>
                <p
                  className='inner:custom-underline inner:custom-underline text-center text-xs
                            text-light-secondary inner:text-accent-blue dark:text-dark-secondary'
                >Get started by connecting to and installing the example snap.
                </p>
              </>
            )}
            
          </div>
          <div className='flex flex-col gap-3'>
            {/* <p className='font-bold'>Already have an account? </p> */}
            {/* <Button
              className='border border-light-line-reply font-bold text-accent-blue hover:bg-accent-blue/10
                         focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20
                         dark:border-light-secondary'
              onClick={signInWithGoogle}
            >
              Sign in
            </Button> */}
            {/* <Button
              className='flex justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                         hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                         dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
              onClick={signInWithGoogle}
            >
              <CustomIcon iconName='GoogleIcon' /> Sign up with Google
            </Button> */}
            {/* <Button
              className='flex cursor-not-allowed justify-center gap-2 border border-light-line-reply font-bold text-light-primary
                         transition hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0
                         dark:bg-white dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
            >
              <CustomIcon iconName='AppleIcon' /> Sign up with Apple
            </Button> */}
            {/* <div className='grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2'>
              <i className='border-b border-light-border dark:border-dark-border' />
              <p>or</p>
              <i className='border-b border-light-border dark:border-dark-border' />
            </div> */}
            {/* <Button
              className='cursor-not-allowed bg-accent-blue text-white transition hover:brightness-90
                         focus-visible:!ring-accent-blue/80 focus-visible:brightness-90 active:brightness-75'
            >
              Sign up with phone or email
            </Button> */}
            {/* <p
              className='inner:custom-underline inner:custom-underline text-center text-xs
                         text-light-secondary inner:text-accent-blue dark:text-dark-secondary'
            >
              By signing up, you agree to the{' '}
              <a
                href='https://twitter.com/tos'
                target='_blank'
                rel='noreferrer'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='https://twitter.com/privacy'
                target='_blank'
                rel='noreferrer'
              >
                Privacy Policy
              </a>
              , including{' '}
              <a
                href='https://help.twitter.com/rules-and-policies/twitter-cookies'
                target='_blank'
                rel='noreferrer'
              >
                Cookie Use
              </a>
              .
            </p> */}

          </div>
        </div>
      </div>
    </main>
  );
}
