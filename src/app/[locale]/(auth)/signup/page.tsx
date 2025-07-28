import Link from 'next/link';

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Sign Up</h1>
      <p>Create your Meetly Omni account</p>
      
      <div style={{ marginTop: '30px' }}>
        <form style={{ display: 'inline-block', textAlign: 'left' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
              Full Name:
            </label>
            <input 
              type="text" 
              id="name" 
              style={{ 
                width: '300px', 
                padding: '10px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }} 
            />
          </div>
          
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
          
          <div style={{ marginBottom: '15px' }}>
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
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
              Confirm Password:
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
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
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Create Account
          </button>
        </form>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <Link href={`/${locale}/login`} style={{ marginRight: '20px' }}>
          Already have an account? Login
        </Link>
        <Link href={`/${locale}/`}>
          Back to Home
        </Link>
      </div>
    </div>
  );
} 