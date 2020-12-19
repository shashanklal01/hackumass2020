import { analyzeSentimentOfFace } from "./vision.js";
import { analyzeSentimentOfText } from "./sentiment.js";

export async function finalAnalysis(text, fileName) {
    textScore = analyzeSentimentOfText(text);
    visionArr = analyzeSentimentOfFace(fileName);

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

    return mood;

}

finalAnalysis("I hate pizza", '../Smiling_pic.jpg');