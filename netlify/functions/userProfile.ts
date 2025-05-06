export const handler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        user_name: 'LucasWfx_',
        user_email: 'lucasmendoncawf@gmail.com',
        user_full_name: 'Lucas Mendonça',
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching trending musics', error: error.message }),
    };
  }
};
