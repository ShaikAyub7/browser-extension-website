export async function GET() {
  return new Response(
    'google.com, pub-9111059587670295, DIRECT, f08c47fec0942fa0',
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}