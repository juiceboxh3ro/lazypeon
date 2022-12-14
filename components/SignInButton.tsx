import { useSession, signIn, signOut } from 'next-auth/react'

const SignInButton = () => {
  const { data: session, ...data } = useSession()
  /**
   * session: {
   *   expires: timestamp,
   *   user: {
   *     name: BNetUsername#0000,
   *     image: string | null
   *   }
   * }
   */

  console.log(data);

  if (session) {
    return (
      <button onClick={() => signOut()}>Sign Out</button>
    )
  }
  return (
    <button onClick={() => signIn()}>Sign In</button>
  )
}

export default SignInButton
