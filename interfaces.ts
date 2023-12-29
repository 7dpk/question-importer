/*
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

follow above format for question
*/
import { ObjectId } from "mongodb";

export interface Question {
    chapter: string[]
    options: number[]
    details: string
    correctOption: number
    image?: string
    createdBy: string
    tags: string[]
    subject: string
    questionClass: string
    difficultyLevel: string
    testIds: ObjectId[]
    explanation: string
}


/*
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

follow above format for test
*/

export interface Test {
    name: string
    instructions: string[]
    rating: number
    testClass: string
    board: string
    subject: string
    totalMarks: number
    passingMarks: number
    dailyTest: boolean
    date: Date
    questionIds: ObjectId[]
    chapterId: ObjectId
    paid: boolean
}