const { get } = require('axios');
const checkWebSite = async (req, res) => {
  const { url } = req.body;

  // Проверка, начинается ли URL с 'http://' или 'https://'
  if ( !/^https?:\/\//i.test(url) ) {
    return res.status(400).
        json({ message: 'URL должен начинаться с http:// или https://' });
  }

  try {
    const resp = await get(url).then(response => {
      return response;
    }).catch(error => {
      return error;
    });

    // Проверка, является ли ответ HTML
    if ( /text\/html/.test(resp.headers['content-type']) ) {
      return res.status(200).json({ message: 'Файлы найдены' });
    } else {
      return res.status(200).json({ message: 'Файлы не найдены' });
    }
  } catch ( error ) {
    console.error(`Error: ${ error }`);
    return res.status(500).
        json({ message: `Ошибка при выполнении запроса: ${ error }` });
  }
};

module.exports = {
  checkWebSite,
};