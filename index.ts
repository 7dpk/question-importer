import { MongoClient, ObjectId } from "mongodb"

/*
    ./questions/europe-test-2.json contains data in this format
    [
    {
     "Question": " 'लाल कुर्ती’ का गठन किसने किया था ?",
     "Options": "काबूर@मेजिनी@बिस्मार्क@गैरीबाल्डी",
     "correctOption": 4,
     "Chapter": "यूरोप में राष्ट्रवाद"
    },
    {
     "Question": "इटली के एकीकरण का मसीहा कहा जाता है?",
     "Options": "नेपोलियन बोनापार्ट@मेजिनी@काबूर@गैरीबाल्डी",
     "correctOption": 2,
     "Chapter": "यूरोप में राष्ट्रवाद"
    },
    ...
    ]

    I've to enter this data into mongodb first in Question collection, then in Test collection
    Test collection will contain the test name and the ids of the questions in that test

    Test in database:
    {
  "_id": {
    "$oid": "63b17baa6b869c948fbcdb83"
  },
  "name": "Test 1",
  "instructions": [
    "चोरी ना करें।",
    "प्रत्येक प्रश्न के चार विकल्प हैं।",
    "जो विकल्प आपको सही उत्तर लगे, उस विकल्प पर क्लिक करें।",
    "अब बोर्ड परीक्षा में बहुत समय नहीं हैं,इसलिए अब टेस्ट दें के खुद को  एग्जाम के लिए तैयार करें।",
    "टेस्ट देने में परेशानी.....हमसे बात करें।"
  ],
  "rating": 3,
  "testClass": "10",
  "board": "Bihar Board",
  "subject": "SSCIENCE",
  "totalMarks": 100,
  "passingMarks": 40,
  "dailyTest": false,
  "date": {
    "$date": "2023-01-01T12:25:13.031Z"
  },
  "questionIds": [
    {
      "$oid": "63b17bad6b869c948fbcdb91"
    },
    {
      "$oid": "63b17bad6b869c948fbcdb92"
    },
    {
      "$oid": "63b17bad6b869c948fbcdb93"
    },
    {
      "$oid": "63b17bae6b869c948fbcdb94"
    },
    {
      "$oid": "63b17bae6b869c948fbcdb95"
    },
    {
      "$oid": "63b17bae6b869c948fbcdb96"
    },
    {
      "$oid": "63b17bae6b869c948fbcdb97"
    },
    {
      "$oid": "63b17bae6b869c948fbcdb98"
    },
    {
      "$oid": "63b17baf6b869c948fbcdb99"
    },
    {
      "$oid": "63b17baf6b869c948fbcdb9b"
    }
  ],
  "chapterId": {
    "$oid": "63bbf3f78bfa5363b0989ce8"
  },
  "paid": false
}

Question in database:
{
  "_id": {
    "$oid": "63aac838f7d5236afd7eda70"
  },
  "chapter": [
    "programming",
    "algebra"
  ],
  "options": [
    "5",
    "4",
    "22",
    "None of the above"
  ],
  "details": "what is 2 + 2 ?",
  "correctOption": {
    "$numberLong": "4"
  },
  "image": "NA",
  "createdBy": {
    "$oid": "639a398eda7faa4351e96b4d"
  },
  "tags": [
    "geometry",
    "angles",
    "polygon"
  ],
  "subject": "Geometry",
  "questionClass": "10",
  "difficultyLevel": "EASY",
  "testIds": [],
  "explanation": "N/A"
}
*/


import { Question, Test } from "./interfaces"
import fs from "fs"
const client = new MongoClient("")


async function main() {
    try {
        const db = client.db("SOLVECHAMP")
        const questions = db.collection("Question")
        const tests = db.collection("Test")
        const session = client.startSession()
        await session.withTransaction(async () => {
            const questionsData = JSON.parse(fs.readFileSync("./questions/current.json", "utf-8"))
            for (const questionData of questionsData) {
                const question: Question = {
                    chapter: [questionData.Chapter],
                    options: questionData.Options.split("@"),
                    details: questionData.Question,
                    correctOption: questionData.correctOption - 1,
                    createdBy: "639a398eda7faa4351e96b4d",
                    tags: [],
                    subject: "Daily test",
                    questionClass: "10",
                    difficultyLevel: "EASY",
                    testIds: [],
                    explanation: "N/A"
                }
                const insertedQuestion = await questions.insertOne(question, { session })
                // push the inserted question id into the test.questionIds array where test._id = 63bbfd35129fe848621f5cef
                await tests.updateOne({ _id: new ObjectId("63bc03ae29751db2154f32c3") }, { $push: { questionIds: insertedQuestion.insertedId } }, { session })
            }
            console.log("done")
            
        })


    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}

main()