import axios from "axios";

async function translateData(text:any, targetLanguage:any) {
  const options = {
    method: 'POST',
    url: 'https://ai-translate.p.rapidapi.com/translates',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'f56a29727amsh1e440faac635274p1398a7jsn31b9a76e1c98',
      'X-RapidAPI-Host': 'ai-translate.p.rapidapi.com'
    },
    data: {
      texts: [text],
      tls: [targetLanguage],
      sl: 'auto'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data; // Retourner les données de traduction
  } catch (error) {
    console.error(error);
    throw new Error("Une erreur s'est produite lors de la traduction");
  }
}

// Export de la fonction pour traduire les données
export default translateData;
