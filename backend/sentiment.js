async function analyzeSentimentOfText(text) {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({ document });

  const sentiment = result.documentSentiment;
  console.log(sentiment.score)
  return sentiment.score;
  // console.log('Document sentiment:');
  // console.log(`  Score: ${sentiment.score}`);
  // console.log(`  Magnitude: ${sentiment.magnitude}`);

  // const sentences = result.sentences;
  // sentences.forEach(sentence => {
  //   console.log(`Sentence: ${sentence.text.content}`);
  //   console.log(`  Score: ${sentence.sentiment.score}`);
  //   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  // });
}


async function analyzeSentimentOfFace(fileName) {

  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const [result] = await client.faceDetection(fileName);
  const faces = result.faceAnnotations;
  let vals = []
  faces.forEach((face, i) => {
    let sorrow = face.sorrowLikelihood;
    let anger = face.angerLikelihood;
    if (sorrow === 'LIKELY') {
      vals.push('LIKELY');
    }
    if (sorrow === 'POSSIBLE') {
      vals.push('POSSIBLE');
    };
    if (sorrow === 'UNLIKELY') {
      vals.push('UNLIKELY');
    }
    if (sorrow === 'VERY_LIKELY') {
      vals.push('VERY_LIKELY');
    }
    if (sorrow === 'VERY_UNLIKELY') {
      vals.push('VERY_UNLIKELY');
    }
    if (anger === 'LIKELY') {
      vals.push('LIKELY');
    }
    if (anger === 'POSSIBLE') {
      vals.push('POSSIBLE');
    };
    if (anger === 'UNLIKELY') {
      vals.push('UNLIKELY');
    }
    if (anger === 'VERY_LIKELY') {
      vals.push('VERY_LIKELY');
    }
    if (anger === 'VERY_UNLIKELY') {
      vals.push('VERY_UNLIKELY');
    }
  });

  return vals;
}


 async function finalAnalysis(text, fileName) {
   let textScore = await analyzeSentimentOfText(text);
   let visionArr = await analyzeSentimentOfFace(fileName);

   //enum to string issue
   //Iterating through visionArr to find visionScore
   var visionScore = 0;
   var i;
   for (i = 0; i < 2; i++) {

     if (visionArr[i] == 'VERY_UNLIKELY') { visionScore += 2; }
     else if (visionArr[i] == 'UNLIKELY') { visionScore += 1; }
     else if (visionArr[i] == 'POSSIBLE') { visionScore -= 1; }
     else if (visionArr[i] == 'LIKELY') { visionScore -= 1; }
     else if (visionArr[i] == 'VERY_LIKELY') { visionScore -= 2; }
   }

   var mood = textScore + visionScore;



   if (mood <= -3) {return 1;} //User is having a very bad day
   else if (mood > -3 && mood <= -1) {return 2;} //User is having a bad ish day
   else if (mood > -1 && mood <= 1) {return 3;} //User is having an okay day
   else if (mood > 1 && mood <= 3) {return 4;} //User is having a decent day
   else if (mood > 3) {return 5;} //User is having a good day
 }



//analyzeSentimentOfText("I hate pizza it is the worst food");
//analyzeSentimentOfFace("../Smiling_pic.jpg")
//let idk = finalAnalysis("I hate pizza it is the worst food", "../Smiling_pic.jpg");
//console.log(finalAnalysis("I hate pizza it is the worst food", "../Smiling_pic.jpg"));
