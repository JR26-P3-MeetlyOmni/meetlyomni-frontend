import Link from 'next/link';

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login</h1>
      <p>Welcome back to Meetly Omni</p>
      
      <div style={{ marginTop: '30px' }}>
        <form style={{ display: 'inline-block', textAlign: 'left' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
              Email:
            </label>
            <input 
              type="email" 
              id="email" 
              style={{ 
                width: '300px', 
                padding: '10px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }} 
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password:
            </label>
            <input 
              type="password" 
              id="password" 
              style={{ 
                width: '300px', 
                padding: '10px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }} 
            />
          </div>
          
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Login
          </button>
        </form>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <Link href={`/${locale}/signup`} style={{ marginRight: '20px' }}>
          Don't have an account? Sign up
        </Link>
        <Link href={`/${locale}/`}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}