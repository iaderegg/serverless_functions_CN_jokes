import fetch from 'node-fetch'
import { createClient } from '@supabase/supabase-js'

export const handler = async (event, context) => {

  const accessToken = JSON.parse(event.body).access_token

  const supabase = createClient('https://oamkgzwrdtfdykeoczpx.supabase.co',
                                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hbWtnendyZHRmZHlrZW9jenB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0Mjg0NzUsImV4cCI6MTk4NTAwNDQ3NX0.D9Jr6dtnfsH1uvDhaXFqrgre0kzG1Q0C97Tf0AWtSh0', {
  })

  const supabaseResponse = await supabase.auth.getUser(accessToken)
  const userData = JSON.parse(JSON.stringify(supabaseResponse))

  let data = {}

  if (userData.data.user) {

    const JOKES_API = 'https://api.chucknorris.io/jokes/random';
    const response = await fetch(JOKES_API)
    data = await response.json()
  } else {
    data = {
      "error": "Invalid token"
    }
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify({
      data
    }),
  }
}
