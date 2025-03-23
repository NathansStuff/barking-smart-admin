export default function CanceledPage() {
  return (
    <div className='container mx-auto py-12'>
      <h1>Payment Canceled</h1>
      <p>You've canceled your payment. Feel free to try again when you're ready.</p>
      <a
        href='/'
        className='text-blue-600 hover:underline'
      >
        Return to Home
      </a>
    </div>
  );
}
