//These are the questions of the test
var questions = [
    {
       text: "Listen and select the appropriate reply, like in a conversation.",
       id: 1,
       answerType: "single",
       answer: ["Not much"],
       level: 1,
       audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/What's-up.mp3",
       options: ["I don't know", "Not much", "Great!","No, thank you"]
   },
   {
       text: "Listen and select the appropriate reply, like in a conversation.",
       id: 2,
       answerType: "single",
       answer: ["I'm 20 years old"],
       level: 1,
       audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/age.mp3",
       options: ["I have 25 years", "I'm 20 years old", "I'm fine, thank you","Not bad"]
   },
   {
       text: "Listen and select the appropriate reply, like in a conversation.",
       id: 3,
       answerType: "single",
       answer: ["I'm from Canada"],
       level: 1,
       audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/origin.mp3",
       options: ["I work from 8 a.m. to 5 p.m.", "I live alone", "I'm a teacher","I'm from Canada"]
   },
   
   {text: "<em>What's his phone number?</em>",
   id: 4,
   answerType: "single",
   answer: ["(456) 555-4322"],
   level: 2,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/contact-for-the-project.mp3",
   options: ["(456) 325-4300", "(456) 345-4322", "(456) 555-4322"]
},

{text: "<em>What's the professor's phone number?</em>",
id: 5,
answerType: "single",
answer: ["(987) 222-6312"],
level: 2,
audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/Professor's-phone-number.mp3",
options: ["(987) 322-6312", "(987) 222-6312", "(987) 333-6352"]
},

{text: "<em>What's the man's phone number?</em>",
id: 6,
answerType: "single",
answer: ["(321) 502-4567"],
level: 2,
audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/contact-number.mp3",
options: ["(321) 502-4567", "(321) 482-4567", "(321) 582-4537"]
},

{
   text: "<em>What's his postal code?</em>",
   id: 7,
   answerType: "single",
   answer: ["L7J 6E3"],
   level: 2,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/postal-code.mp3",
   options: ["L7J 6E3", "L7G 6I3", "87G 6I3"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 8,
   answerType: "single",
   answer: ["Yes, she does"],
   level: 3,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/A-pet.mp3",
   options: ["Yes, he has", "No, I can't", "Yes, she does", "No, he can't"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 9,
   answerType: "single",
   answer: ["He's a lawyer"],
   level: 3,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/for-a-living.mp3",
   options: ["He lives in Los Angeles", "He's a lawyer", "She's from Barcelona", "She lives alone"]
},

{
   text: "<em>Select the correct conclusion from the conversation you hear.</em>",
   id: 10,
   answerType: "single",
   answer: ["He doesn't have brothers or sisters"],
   level: 3,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/number-of-siblings.mp3",
   options: ["He doesn't have brothers or sisters", "He has a little baby", "He only has a little brother"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 11,
   answerType: "single",
   answer: ["In my car"],
   level: 3,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/get-to-work.mp3",
   options: ["I'm a doctor", "In my car", "Yes, I love my job"]
},

{
   text: "<em>What is true according to the recording?</em>",
   id: 12,
   answerType: "single",
   answer: ["The woman enjoys dancing Salsa"],
   level: 3,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/dancing-salsa.mp3",
   options: ["The man hates dancing Salsa", "The woman loves the man", "The man loves the woman","The woman enjoys dancing Salsa"]
}, 
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 13,
   answerType: "single",
   answer: ["Yes, there are several goods restaurants in the area"],
   level: 4,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/good-places.mp3",
   options: ["Yes, I eat lunch in my house", "Yes, there are several goods restaurants in the area", "No, I don't eat lunch in my house"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 14,
   answerType: "single",
   answer: ["I was at a party"],
   level: 4,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/last-night.mp3",
   options: ["I'm in the garden", "He was at home", "She's in class now","I was at a party"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 15,
   answerType: "single",
   answer: ["Yes, she did"],
   level: 4,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/understand-the-topic.mp3",
   options: ["Yes, she did", "No, I didn't", "No you didn't","Yes, he does"]
},
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 16,
   answerType: "single",
   answer: ["It was delicious"],
   level: 4,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A1/enjoy-the-food.mp3",
   options: ["Not chicken again, please!", "I'm not hungry", "It was delicious"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 17,
   answerType: "single",
   answer: ["I think it'll rain tonight"],
   level: 5,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/overcast.mp3",
   options: ["It's a perfect day for a picnic", "I think it'll rain tonight", "What a beautiful day! It's completely clear"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 18,
   answerType: "single",
   answer: ["Let's stay inside and drink hot chocolate"],
   level: 5,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/frosty.mp3",
   options: ["Let's stay inside and drink hot chocolate", "A good time for a swim, don't you think", "I love this kind of weather for sunbathing"]
},
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 19,
   answerType: "single",
   answer: ["Let's go to the beach!"],
   level: 5,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/Sunny.mp3",
   options: ["You'll need an umbrella for the rain", "Let's go to the beach!", "We should build a snowman"]
},

{
   text: "<em>Where is she going?</em>",
   id: 20,
   answerType: "single",
   answer: ["To the beach"],
   level: 6,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/Samantha.mp3",
   options: ["To the library", "To the beach", "To a job interview"]
},

{
   text: "<em>Where is he going?</em>",
   id: 21,
   answerType: "single",
   answer: ["To his sister's wedding"],
   level: 6,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/John.mp3",
   options: ["To the gym", "To the beach", "To his sister's wedding"]
},

{
   text: "<em>Where is she going?</em>",
   id: 22,
   answerType: "single",
   answer: ["To the gym"],
   level: 6,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/Lisa.mp3",
   options: ["To the gym", "To a wedding", "To a music concert"]
},

{
   text: "<em>What's true according to the recording</em>",
   id: 23,
   answerType: "single",
   answer: ["It's a good idea to take the metro"],
   level: 7,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/Avoid-traffic.mp3",
   options: ["Taking the metro isn't a good idea", "It's a good idea to take the metro", "It's not possible for him to take the metro"]
},

{
   text: "<em>What's true according to the recording</em>",
   id: 24,
   answerType: "single",
   answer: ["The man doesn't know for sure if they'll need identification"],
   level: 7,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/identification.mp3",
   options: ["Identification is not necessary to enter the club", "The man knows for sure they'll need identification", "The man doesn't know for sure if they'll need identification"]
},

{
   text: "<em>What's true according to the recording</em>",
   id: 25,
   answerType: "single",
   answer: ["It's not necessary to bring equipment to the yoga class"],
   level: 7,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/A2/Yoga+class.mp3",
   options: ["You can't bring any equipment to the yoga class", "You need to bring your own equipment", "It's not necessary to bring equipment to the yoga class"]
},

{
   text: "<em>Select the option that best describes the situation.</em>",
   id: 26,
   answerType: "single",
   answer: ["The man allowed the woman to close the door"],
   level: 8,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Close+the+door.mp3",
   options: ["The man didn't allow the woman to close the door", "The man allowed the woman to close the door", "The woman asked the man to close the door"]
},

{
   text: "<em>What can we say about the woman?</em>",
   id: 27,
   answerType: "single",
   answer: ["She thinks visiting the Louvre Museum is a good plan"],
   level: 8,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Luvre+museum.mp3",
   options: ["She thinks visiting the Louvre Museum is a good plan", "She needs directions to get to the Louvre Museum", "She's asking general information about the Museum"]
},

{
   text: "<em>What does the man want?</em>",
   id: 28,
   answerType: "single",
   answer: ["Smaller bills or coins"],
   level: 8,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/change-for-a-bill.mp3",
   options: ["Borrow some money", "Buy something from the woman", "Smaller bills or coins","know the cashier's location"]
},
{
   text: "<em>What is true according to the recording?</em>",
   id: 29,
   answerType: "single",
   answer: ["The rain stopped before the end of the class"],
   level: 9,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/rain+had+stopped.mp3",
   options: ["The class ended, and then it stopped raining", "The rain stopped before the end of the class", "People got wet because of the rain","They cancelled the class because of the rain"]
},
{
   text: "<em>What is true according to the recording?</em>",
   id: 30,
   answerType: "single",
   answer: ["Lisa left before he arrived at the office"],
   level: 9,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Pick+up+Lisa.mp3",
   options: ["Lisa left before he arrived at the office", "Lisa didn't tell the man about her medical appointment", "The man had a medical appointment"]
},

{
   text: "<em>What is true according to the recording?</em>",
   id: 31,
   answerType: "single",
   answer: ["Jack had prepared everything for his vacation when his boss called him"],
   level: 9,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/delayed+vacation.mp3",
   options: ["Jack went on vacation and resolved the work issue at the same time", "Jack's boss asked him for help two weeks before his vacation", "The work problem happened after Jack came back from his vacation","Jack had prepared everything for his vacation when his boss called him"]
},

{
   text: "<em>What did he buy?</em>",
   id: 32,
   answerType: "single",
   answer: ["Skateboard"],
   level: 10,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/New+skateboard.mp3",
   options: ["Video Game", "Skateboard", "Basketball"]
},

{
   text: "<em>What did the woman lose?</em>",
   id: 33,
   answerType: "single",
   answer: ["A ring"],
   level: 10,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/lost+object+1.mp3",
   options: ["Her purse", "A ring", "A necklace", "A bracelet"]
},

{
   text: "<em>What does the woman want to buy?</em>",
   id: 34,
   answerType: "single",
   answer: ["A painting"],
   level: 10,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/on+the+wall.mp3",
   options: ["A new TV set","A piece of jewelry", "A new dress", "A painting"]
},

{
   text: "You will hear a conversation between a mother and her son, Max, about his summer plans. <b>Check all the statements that are true.</b>",
   id: 35,
   answerType: "multiple",
   answer: ["Max will be attending the science camp with more of his friends this year","Max's mother wants him to start packing for the camp early"],
   level: 11,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Science+camp.mp3",
   options: ["Max hasn't made up his mind about what he wants to do this summer","Max had a great time at the science camp last year", "The location of the science camp has remained the same as last year","Max will be attending the science camp with more of his friends this year","The new location of the science camp is at a beach house","Max's mother wants him to start packing for the camp early"]
}, 
{
   text: "You will hear a conversation between a teacher and a student named Alice about an upcoming project. <b>Check all the statements that are true.</b>",
   id: 36,
   answerType: "multiple",
   answer: ["Alice's project will show how the sun, moon, and stars move and how gravity works", "Ben likes learning about the space too","The teacher suggests that Alice and Ben should do an equal amount of work"],
   level: 11,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Science+project.mp3",
   options: ["Alice's project will be about models", "Alice's project will show how the sun, moon, and stars move and how gravity works", "The teacher doesn't like Alice's project idea", "The teacher thinks Alice shouldn't work with Ben","Ben likes learning about the space too", "The teacher suggests that Alice and Ben should do an equal amount of work"]
}, 

{
   text: "You will hear a conversation between two friends, Josh and Mia, about a concert. <b>Check all the statements that are true.</b>",
   id: 37,
   answerType: "multiple",
   answer: ["Mia already knew about the concert","Mia was concerned about the weather","Mia is looking forward to hearing a specific song at the concert"],
   level: 12,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/A+concert.mp3",
   options: ["Mia already knew about the concert", "Josh is hoping to get the tickets for the concert", "Mia was concerned about the weather","The concert is going to take place indoors", "According to the weather forecast, it's going to rain on the concert day", "Mia is looking forward to hearing a specific song at the concert"]
}, 

{
   text: "You will hear a conversation between two colleagues, Mark and Laura, about a work project. <b>Check all the statements that are true.</b>",
   id: 38,
   answerType: "multiple",
   answer: ["Mark and Laura need to work on the Peterson account","The financial report for the Johnston account is completed"],
   level: 12,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Project+report.mp3",
   options: ["Mark and Laura need to work on the Peterson account", "Laura is working on the Johnston account today", "The financial report for the Johnston account is completed","Mark and Laura have already discussed the strategy for the Miller account", "Laura doesn't agree on discussing the Miller account", "The Peterson report is already finished."]
},
];
