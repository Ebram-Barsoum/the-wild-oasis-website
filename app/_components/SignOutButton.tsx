import { signOutAction } from '@/app/_lib/actions'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid';

function SignOutButton(): JSX.Element {
    return (
        <form action={signOutAction} className='mt-auto'>
            <button className=" flex gap-3 text-lg font-bold text-primary-300 w-full py-3 px-4 hover:bg-primary-900">
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-500" />
                <span className="hidden md:block" >Logout</span>
            </button>
        </form>
    )
}

export default SignOutButton;