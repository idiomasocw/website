//These are the questions of the test
var questions = [
    {
       text: "Listen and select the appropriate reply, like in a conversation.",
       id: 1,
       answerType: "single",
       answer: ["Not much"],
       level: 1,
       audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level1/What's-up.mp3",
       options: ["I don't know", "Not much", "Great!","No, thank you"]
   },
   {
       text: "Listen and select the appropriate reply, like in a conversation.",
       id: 2,
       answerType: "single",
       answer: ["I'm 20 years old"],
       level: 1,
       audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level1/age.mp3",
       options: ["I'm a doctor", "I'm 20 years old", "I'm fine, thank you","Not bad"]
   },
   {
       text: "Listen and select the appropriate reply, like in a conversation.",
       id: 3,
       answerType: "single",
       answer: ["I'm from Canada"],
       level: 1,
       audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level1/origin.mp3",
       options: ["I work from 8 a.m. to 5 p.m.", "I live alone", "I'm a teacher","I'm from Canada"]
   },
   {text: "<em>What's his phone number?</em>",
   id: 4,
   answerType: "single",
   answer: ["You're welcome"],
   level: 1,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level1/Thank%20you.mp3",
   options: ["You're welcome", "Nice to meet you", "Yes, please","I'm sorry about that"]
},
   
   {text: "<em>What's his phone number?</em>",
   id: 5,
   answerType: "single",
   answer: ["(456) 555-4322"],
   level: 2,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level2/contact-for-the-project.mp3",
   options: ["(456) 325-4300", "(456) 345-4322", "(456) 555-4322"]
},

{text: "<em>What's the professor's phone number?</em>",
id: 6,
answerType: "single",
answer: ["(987) 222-6312"],
level: 2,
audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level2/Professor's-phone-number.mp3",
options: ["(987) 322-6312", "(987) 222-6312", "(987) 333-6352"]
},

{text: "<em>What's the man's phone number?</em>",
id: 7,
answerType: "single",
answer: ["(321) 502-4567"],
level: 2,
audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level2/contact-number.mp3",
options: ["(321) 502-4567", "(321) 482-4567", "(321) 582-4537"]
},

{
   text: "<em>What's his postal code?</em>",
   id: 8,
   answerType: "single",
   answer: ["L7J 6E3"],
   level: 2,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level2/postal-code.mp3",
   options: ["L7J 6E3", "L7G 6I3", "87G 6I3"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 9,
   answerType: "single",
   answer: ["Yes, she does"],
   level: 3,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level3/A-pet.mp3",
   options: ["Yes, he has", "No, I can't", "Yes, she does", "No, he can't"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 10,
   answerType: "single",
   answer: ["He's a lawyer"],
   level: 3,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level3/for-a-living.mp3",
   options: ["He lives in Los Angeles", "He's a lawyer", "She's from Barcelona", "She lives alone"]
},

{
   text: "<em>Select the correct conclusion from the conversation you hear.</em>",
   id: 11,
   answerType: "single",
   answer: ["He doesn't have brothers or sisters"],
   level: 3,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level3/number-of-siblings.mp3",
   options: ["He doesn't have brothers or sisters", "He has a little baby", "He only has a little brother"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 12,
   answerType: "single",
   answer: ["In my car"],
   level: 3,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level3/get-to-work.mp3",
   options: ["I'm a doctor", "In my car", "Yes, I love my job"]
},

{
   text: "<em>What is true according to the recording?</em>",
   id: 13,
   answerType: "single",
   answer: ["The woman enjoys dancing Salsa"],
   level: 3,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level3/dancing-salsa.mp3",
   options: ["The man hates dancing Salsa", "The woman loves the man", "The man loves the woman","The woman enjoys dancing Salsa"]
}, 
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 14,
   answerType: "single",
   answer: ["Yes, there are several good restaurants in the area"],
   level: 4,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level4/good-places.mp3",
   options: ["Yes, I eat lunch in my house", "Yes, there are several good restaurants in the area", "No, I don't eat lunch in my house"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 15,
   answerType: "single",
   answer: ["I was at a party"],
   level: 4,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level4/last-night.mp3",
   options: ["I'm in the garden", "He was at home", "She's in class now","I was at a party"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 16,
   answerType: "single",
   answer: ["Yes, she did"],
   level: 4,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level4/understand-the-topic.mp3",
   options: ["Yes, she did", "No, I didn't", "No you didn't","Yes, he does"]
},
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 17,
   answerType: "single",
   answer: ["It was delicious"],
   level: 4,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level4/enjoy-the-food.mp3",
   options: ["Not chicken again, please!", "I'm not hungry", "It was delicious"]
},
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 18,
   answerType: "single",
   answer: ["Yes, I'll be there with my friends"],
   level: 5,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level5/at%20the%20concert.mp3",
   options: ["Yes, I'll be there with my friends", "No, there wasn't a concert last night", "Because my favorite band will be there"]
},
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 19,
   answerType: "single",
   answer: ["Of course. They'll come with me"],
   level: 5,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level5/parents%20on%20vacation%20trip.mp3",
   options: ["No, I don't wanna travel with my partner", "Of course. They'll come with me","Yes, we did"]
},
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 20,
   answerType: "single",
   answer: ["Yes, I'm signing up for it"],
   level: 5,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level5/register%20for%20photography%20course.mp3",
   options: ["Yes, I'm signing up for it", "What's a lottery source?", "I couldn't agree more"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 21,
   answerType: "single",
   answer: ["No, she's not. She already did"],
   level: 5,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A1/sub-level5/take%20the%20test%20tomorrow.mp3",
   options: ["Yes, she's going to participate in that contest tomorrow", "She'll come next Friday","No, she's not. She already did"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 22,
   answerType: "single",
   answer: ["I think it'll rain tonight"],
   level: 6,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level6/overcast.mp3",
   options: ["It's a perfect day for a picnic", "I think it'll rain tonight", "What a beautiful day! It's completely clear"]
},

{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 23,
   answerType: "single",
   answer: ["Makes me want to stay in and have a warm cup of tea"],
   level: 6,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level6/frosty.mp3",
   options: ["Makes me want to stay in and have a warm cup of tea", "A good time for a swim, don't you think", "I love this kind of weather for sunbathing"]
},
{
   text: "<em>Listen and select the appropriate reply, like in a conversation.</em>",
   id: 24,
   answerType: "single",
   answer: ["Let's go to the beach!"],
   level: 6,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level6/Sunny.mp3",
   options: ["You'll need an umbrella for the rain", "Let's go to the beach!", "We should build a snowman"]
},

{
   text: "<em>Where is she going?</em>",
   id: 25,
   answerType: "single",
   answer: ["To the beach"],
   level: 7,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level7/Samantha.mp3",
   options: ["To the library", "To the beach", "To a job interview","To the gym"]
},

{
   text: "<em>Where is he going?</em>",
   id: 26,
   answerType: "single",
   answer: ["To his sister's wedding"],
   level: 7,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level7/John.mp3",
   options: ["To the gym", "To the beach", "To his sister's wedding","To the supermarket"]
},

{
   text: "<em>Where is she going?</em>",
   id: 27,
   answerType: "single",
   answer: ["To the gym"],
   level: 7,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level7/Lisa.mp3",
   options: ["To the gym", "To a wedding", "To a music concert","To her English class"]
},

{
   text: "<em>What's true in the recording</em>",
   id: 28,
   answerType: "single",
   answer: ["It's a good idea to take the metro"],
   level: 8,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level8/Avoid-traffic.mp3",
   options: ["Taking the metro isn't a good idea", "It's a good idea to take the metro", "It's not possible for him to take the metro"]
},

{
   text: "<em>What's true in the recording</em>",
   id: 29,
   answerType: "single",
   answer: ["The man doesn't know for sure if they'll need identification"],
   level: 8,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level8/identification.mp3",
   options: ["Identification is not necessary to enter the club", "The man knows for sure they'll need identification", "The man doesn't know for sure if they'll need identification"]
},

{
   text: "<em>What's true in the recording</em>",
   id: 30,
   answerType: "single",
   answer: ["It's not necessary to bring equipment to the yoga class"],
   level: 8,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level8/Yoga%20class.mp3",
   options: ["You can't bring any equipment to the yoga class", "You need to bring your own equipment", "It's not necessary to bring equipment to the yoga class"]
},
{
   text: "<em>What's true in the recording</em>",
   id: 31,
   answerType: "single",
   answer: ["Parking is not permitted in this area"],
   level: 8,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level8/no%20parking%20zone.mp3",
   options: ["Parking is not permitted in this area", "Parking is permitted in this area", "You can park your car here for a short time"]
},
{
   text: "<em>What's true in the recording</em>",
   id: 32,
   answerType: "single",
   answer: ["Smoking is not allowed inside the restaurant"],
   level: 8,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level8/no%20smoking.mp3",
   options: ["Smoking is allowed only for regular customers", "Smoking is not allowed inside the restaurant","There's a special area for smoking inside the restaurant"]
},
{
   text: "<em>What's true in the recording</em>",
   id: 33,
   answerType: "single",
   answer: ["Expresso Express coffee is better than the coffee from Cafe Cozy"],
   level: 9,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level9/best%20coffee.mp3",
   options: ["Cafe Cozy has better coffee than Expresso Express", "Cafe Cozy has the best coffee and service in town","Expresso Express coffee is better than the coffee from Cafe Cozy"]
},
{
   text: "<em>What's true in the recording</em>",
   id: 34,
   answerType: "single",
   answer: ["The Johnsons' garden is smaller than the Smiths'"],
   level: 9,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level9/bigger%20garden.mp3",
   options: ["The Smiths' garden is as big as the Johnsons'", "The Johnsons' garden is smaller than the Smiths'","The Smiths' have the largest garden in the neighborhood"]
},
{
   text: "<em>What's true in the recording</em>",
   id: 35,
   answerType: "single",
   answer: ["Lisa is more creative than Mark"],
   level: 9,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level9/diligent%20and%20creative.mp3",
   options: ["Mark is more creative than Lisa", "Lisa is more creative than Mark", "Lisa is as diligent as Mark"]
},
{
   text: "<em>What's true in the recording</em>",
   id: 36,
   answerType: "single",
   answer: ["This exam was more difficult than the last one"],
   level: 9,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/A2/sub-level9/more%20challenging%20exam.mp3",
   options: ["The questions in the previous exam were easier than the questions in this exam", "This exam allowed more time than the last one","This exam was more difficult than the last one"]
},
{
   text: "<em>Select the option that best describes the situation.</em>",
   id: 37,
   answerType: "single",
   answer: ["The man allowed the woman to close the door"],
   level: 10,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level10/Close%20the%20door.mp3",
   options: ["The man didn't allow the woman to close the door", "The man allowed the woman to close the door", "The woman asked the man to close the door"]
},

{
   text: "<em>What can we say about the woman?</em>",
   id: 38,
   answerType: "single",
   answer: ["She thinks visiting the Louvre Museum is a good plan"],
   level: 10,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level10/Louvre%20museum.mp3",
   options: ["She thinks visiting the Louvre Museum is a good plan", "She needs directions to get to the Louvre Museum", "She's asking general information about the Museum"]
},

{
   text: "<em>What does the man want?</em>",
   id: 39,
   answerType: "single",
   answer: ["Smaller bills or coins"],
   level: 10,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level10/change-for-a-bill.mp3",
   options: ["Borrow some money", "Buy something from the woman", "Smaller bills or coins","know the cashier's location"]
},
{
   text: "<em>What is true in the recording?</em>",
   id: 40,
   answerType: "single",
   answer: ["The woman didn't allow the man to smoke there"],
   level: 10,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level10/permission%20to%20smoke.mp3",
   options: ["The woman didn't allow the man to smoke there", "The man wants to buy some cigarettes", "The woman didn't want to smoke"]
},
{
   text: "<em>What is true in the recording?</em>",
   id: 41,
   answerType: "single",
   answer: ["The rain stopped before the end of the class"],
   level: 11,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level11/rain%20had%20stopped.mp3",
   options: ["The class ended, and then it stopped raining", "The rain stopped before the end of the class", "People got wet because of the rain","They canceled the class because of the rain"]
},
{
   text: "<em>What is true in the recording?</em>",
   id: 42,
   answerType: "single",
   answer: ["Lisa left before he arrived at the office"],
   level: 11,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level11/Pick%20up%20Lisa.mp3",
   options: ["Lisa left before he arrived at the office", "Lisa didn't tell the man about her medical appointment", "The man had a medical appointment"]
},

{
   text: "<em>What is true in the recording?</em>",
   id: 43,
   answerType: "single",
   answer: ["Jack had prepared everything for his vacation when his boss called him"],
   level: 11,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level11/delayed%20vacation.mp3",
   options: ["Jack went on vacation and resolved the work issue at the same time", "Jack's boss asked him for help two weeks before his vacation", "The work problem happened after Jack came back from his vacation","Jack had prepared everything for his vacation when his boss called him"]
},
{
   text: "<em>What is true in the recording?</em>",
   id: 44,
   answerType: "single",
   answer: ["Alice was disappointed because she didn't get the promotion"],
   level: 11,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level11/Alice%20didn't%20get%20a%20promotion.mp3",
   options: ["Alice was disappointed because she didn't get the promotion", "Sara was disappointed because the project was way behind schedule", "Alice was disappointed because Sara's project was behind schedule","Sara was disappointed because she didn't get the promotion"]
},

{
   text: "<em>What did he buy?</em>",
   id: 45,
   answerType: "single",
   answer: ["Skateboard"],
   level: 12,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level12/New%20skateboard.mp3",
   options: ["Video Game", "Skateboard", "Basketball"]
},

{
   text: "<em>What did the woman lose?</em>",
   id: 46,
   answerType: "single",
   answer: ["A ring"],
   level: 12,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level12/lost%20ring.mp3",
   options: ["Her purse", "A ring", "A necklace", "A bracelet"]
},

{
   text: "<em>What does the woman want to buy?</em>",
   id: 47,
   answerType: "single",
   answer: ["A painting"],
   level: 12,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level12/on%20the%20wall.mp3",
   options: ["A new TV set","A piece of jewelry", "A new dress", "A painting"]
},

{
   text: "<em>What is true in the recording?</em>",
   id: 48,
   answerType: "single",
   answer: ["They've decided to go to the beach"],
   level: 12,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level12/Going%20to%20the%20beach.mp3",
   options: ["They've decided to go to the beach","They will probably go on a mountain trip for their vacation", "The husband wants to visit the beach, but the wife prefers the mountains", "They still haven't decided where to go on vacation"]
},

{
   text: "<em>What can we infer about Maria's job?</em>",
   id: 49,
   answerType: "single",
   answer: ["It has a good salary"],
   level: 13,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level13/high-paying%20job.mp3",
   options: ["It's not very demanding", "It has a good salary","It requires a lot of time", "It'll allow her to spend more time with her family"]
},

{
   text: "<em>What can we infer about the work environment under the new manager?</em>",
   id: 50,
   answerType: "single",
   answer: ["It's more relaxed and collaborative"],
   level: 13,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level13/low-pressure.mp3",
   options: ["It's very stressful but people help each other", "It's become more competitive and people are more motivated", "It's more relaxed and collaborative","It'll offer better advancement opportunities"]
},

{
   text: "<em>What's true about Juan's job?</em>",
   id: 51,
   answerType: "single",
   answer: ["It allows him to balance work and studies"],
   level: 13,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level13/part-time%20job.mp3",
   options: ["It takes up most of his time", "It allows him to balance work and studies","He works only on weekends", "It's low-pressure and well-paid"]
},
{
   text: "<em>Why does the teacher praise Sophia's children?</em>",
   id: 52,
   answerType: "single",
   answer: ["Because they have good behavior and are good role models"],
   level: 13,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level13/well-behaved.mp3",
   options: ["Because they understand topics that are usually too difficult for kids their same age", "Because they help the other kids in their class", "Because they have good behavior and are good role models","Because they usually give their teacher pears"]
},
{
   text: "<em>What is true about the town's festival?</em>",
   id: 53,
   answerType: "single",
   answer: ["It's celebrated every year"],
   level: 14,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level14/annual%20festival.mp3",
   options: ["Bands from all over the region were invited to perform", "The authorities cloased many streets to make space for the parade", "there wasn't enough space for the parade","It's celebrated every year"]
},
{
   text: "<em>What is true about the project?</em>",
   id: 54,
   answerType: "single",
   answer: ["Students will receive feedback before the final presentation of the project"],
   level: 14,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level14/the%20project%20proposal.mp3",
   options: ["Students will receive feedback before the final presentation of the project", "The committee reviewed it last week", "the members of the committee prepared the project proposal before the final presentation"]
},
{
   text: "<em>What is true about the concert?</em>",
   id: 55,
   answerType: "single",
   answer: ["the concert organizers wanted to help kids who were in a difficult situation"],
   level: 14,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level14/charity%20concert.mp3",
   options: ["the concert organizers wanted to help kids who were in a difficult situation", "the concert took place by the river", "several famous musicians were captivated by the audience, almost all the musicians that lived in town attended the concert"]
},

{
   text: "<em>What is true about the science fair?</em>",
   id: 56,
   answerType: "single",
   answer: ["the creativity and practicality of the winning project impressed the judges"],
   level: 14,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level14/The%20science%20fair%20projects.mp3",
   options: ["the creativity and practicality of the winning project impressed the judges", "a renowned physicist received his well-deserved recognition", "the judges were a team of experts in renewable energy","the winning project received help from a famous physicist"]
},
{
   text: "<em>What is true in the recording?</em>",
   id: 57,
   answerType: "single",
   answer: ["They'll meet up on Wednesday"],
   level: 15,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level15/Client%20meeting.mp3",
   options: ["They'll meet up on Wednesday", "They'll meet up on Friday", "They won't have enough time for a meeting","they'll meet up and work on the presentation next week"]
},
{
   text: "<em>What is true in the recording?</em>",
   id: 58,
   answerType: "single",
   answer: ["Maria will meet up with the man on Thursday"],
   level: 15,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level15/Discuss%20the%20project.mp3",
   options: ["Maria will meet up with the man on Thursday", "Maria won't be able to attend the workshop on Friday morning", "The man won't be able to discuss the project with Maria","Thursday is the most convenient day for Maria"]
},
{
   text: "<em>What is true in the recording?</em>",
   id: 59,
   answerType: "single",
   answer: ["They'll discuss their reading assignment on Sunday afternoon"],
   level: 15,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level15/Reading%20assignment.mp3",
   options: ["They'll discuss their reading assignment on Sunday afternoon", "The woman thinks is best to have two meetings, one on Sunday and the other on Monday", "They'll meet in the libray on Saturday afternoon","They'll meet up in the library on Monday"]
},
{
   text: "<em>What is the meeting being rescheduled to?</em>",
   id: 60,
   answerType: "single",
   answer: ["Next Wednesday"],
   level: 15,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B1/sub-level15/Reschedule%20meeting.mp3",
   options: ["Tomorrow, Next Monday", "Next Thursday","The meeting got cancelled","Next Wednesday"]
},
{
   text: "Listen to John and Susan talk about their weekend. <b>Which statement is NOT TRUE in the recording</b>",
   id: 61,
   answerType: "single",
   answer: ["Susan has been teaching John how to play the guitar"],
   level: 16,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B2/sub-level17/music%20festival.mp3",
   options: ["Susan didn't go hiking in the mountains with John", "John's never been to a music festival but he'd like to", "Susan has been learning to play a musical instrument", "Susan has been teaching John how to play the guitar", "John is interested in learning a musical instrument"]
},
{
   text: "Listen to Pete and Abby talk about movies. <b>Which statement is NOT TRUE in the recording</b>",
   id: 62,
   answerType: "single",
   answer: ["The latest movie was a little predictable"],
   level: 16,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B2/sub-level17/film%20festival.mp3",
   options: ["Abby hasn't watched the movie that came out","Pete recommends the latest movie to Abby", "The latest movie was a little predictable", "Pete thinks the latest movie was impressive","Abby suggests they can go to a movie festival together"]
},
{
   text: "Listen to Alex and Craig. <b>Which statement is NOT TRUE in the recording</b>",
   id: 63,
   answerType: "single",
   answer: ["The new restaurant is specialized in local dishes"],
   level: 16,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B2/sub-level17/new%20restaurant.mp3",
   options: ["Alex likes trying food from different countries", "The new restaurant is specialized in local dishes","Alex has tried cooking food from other countries at home","Craig has cooked international dishes at home"]
},
{
   text: "You will hear a conversation between a mother and her son, Max, about his summer plans. <b>Which statement is NOT TRUE in the recording</b>",
   id: 64,
   answerType: "single",
   answer: ["Max had a great time at the science camp last year"],
   level: 17,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Science+camp.mp3",
   options: ["Max has already made up his mind about what he wants to do this summer","The location of the science camp has changed this year","Max will be attending the science camp with more of his friends this year","Max had a great time at the science camp last year", "Max's mother wants him to start packing for the camp early"]
}, 
{
   text: "You will hear a conversation between a teacher and a student named Alice about an upcoming project. <b>Which statement is NOT TRUE in the recording.</b>",
   id: 65,
   answerType: "single",
   answer: ["Alice and Ben will be part of a bigger team"],
   level: 17,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Science+project.mp3",
   options: ["Alice and Ben will be part of a bigger team", "Alice's project will show how the sun, moon, and stars move and how gravity works", "The teacher likes Alice's project idea", "Ben likes learning about space too", "The teacher suggests that Alice and Ben should do an equal amount of work"]
}, 

{
   text: "You will hear a conversation between two friends, Josh and Mia, about a concert. <b>Which statement is NOT TRUE in the recording.</b>",
   id: 66,
   answerType: "single",
   answer: ["Josh is hoping to get the tickets for the concert"],
   level: 17,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/A+concert.mp3",
   options: ["Mia already knew about the concert", "Josh is hoping to get the tickets for the concert", "Mia was concerned about the weather","The concert is not going to take place indoors", "Mia is looking forward to hearing a specific song at the concert"]
}, 

{
   text: "You will hear a conversation between two colleagues, Mark and Laura, about a work project. <b>Which statement is NOT TRUE in the recording.</b>",
   id: 67,
   answerType: "single",
   answer: ["Mark and Laura have already discussed the strategy for the Miller account"],
   level: 17,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Project+report.mp3",
   options: ["The Peterson report is still not finished yet", "The financial report for the Johnston account is completed","Mark and Laura have already discussed the strategy for the Miller account", "Laura reports to Mark", "Mark hasn't analyzed the Johnston's report yet"]
},
/* {
   text: "Listen to John and Susan talk about their weekend. <b>Check all the true statements.</b>",
   id: 61,
   answerType: "multiple",
   answer: ["John's never been to a music festival but he'd like to","Susan has been learning to play a musical instrument", "John is interested in learning a musical instrument"],
   level: 16,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B2/sub-level17/music%20festival.mp3",
   options: ["Susan went hiking in the mountains and then attended a concert", "John's never been to a music festival but he'd like to", "Susan has been learning to play a musical instrument", "Susan has been teaching John how to play the guitar", "John is interested in learning a musical instrument"]
},
{
   text: "Listen to Pete and Abby talk about movies. <b>Check all the true statements.</b>",
   id: 62,
   answerType: "multiple",
   answer: ["Pete recommends the latest movie to Abby","Pete thinks the latest movie was impressive","Abby suggests they can go to a movie festival together"],
   level: 16,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B2/sub-level17/film%20festival.mp3",
   options: ["Abby and Pete discuss about the new cinema in town", "Abby doesn't want to watch the movie that came out","Pete recommends the latest movie to Abby", "The latest movie was a little predictable", "Pete thinks the latest movie was impressive","Abby suggests they can go to a movie festival together"]
},
{
   text: "Listen to Alex and Craig. <b>Check all the true statements.</b>",
   id: 63,
   answerType: "multiple",
   answer: ["Alex likes trying food from different countries","The new restaurant offers international dishes","Alex has tried cooking food from other countries at home"],
   level: 16,
   audioUrl: "https://d37w1mprrue3dh.cloudfront.net/Audio/B2/sub-level17/new%20restaurant.mp3",
   options: ["Alex likes trying food from different countries", "The new restaurant is specialized in local dishes","The new restaurant offers international dishes", "Craig would like to learn how to cook", "Alex has tried cooking food from other countries at home","Craig has never cooked an international dish"]
},
{
   text: "You will hear a conversation between a mother and her son, Max, about his summer plans. <b>Check all the true statements.</b>",
   id: 64,
   answerType: "multiple",
   answer: ["Max will be attending the science camp with more of his friends this year","Max's mother wants him to start packing for the camp early"],
   level: 17,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Science+camp.mp3",
   options: ["Max hasn't made up his mind about what he wants to do this summer","Max had a great time at the science camp last year", "The location of the science camp has remained the same as last year","Max will be attending the science camp with more of his friends this year","The new location of the science camp is at a beach house","Max's mother wants him to start packing for the camp early"]
}, 
{
   text: "You will hear a conversation between a teacher and a student named Alice about an upcoming project. <b>Check all the true statements.</b>",
   id: 65,
   answerType: "multiple",
   answer: ["Alice's project will show how the sun, moon, and stars move and how gravity works", "Ben likes learning about space too","The teacher suggests that Alice and Ben should do an equal amount of work"],
   level: 17,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Science+project.mp3",
   options: ["Alice's project will be about models", "Alice's project will show how the sun, moon, and stars move and how gravity works", "The teacher doesn't like Alice's project idea", "The teacher thinks Alice shouldn't work with Ben","Ben likes learning about space too", "The teacher suggests that Alice and Ben should do an equal amount of work"]
}, 

{
   text: "You will hear a conversation between two friends, Josh and Mia, about a concert. <b>Check all the true statements.</b>",
   id: 66,
   answerType: "multiple",
   answer: ["Mia already knew about the concert","Mia was concerned about the weather","Mia is looking forward to hearing a specific song at the concert"],
   level: 17,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/A+concert.mp3",
   options: ["Mia already knew about the concert", "Josh is hoping to get the tickets for the concert", "Mia was concerned about the weather","The concert is going to take place indoors", "According to the weather forecast, it's going to rain on the concert day", "Mia is looking forward to hearing a specific song at the concert"]
}, 

{
   text: "You will hear a conversation between two colleagues, Mark and Laura, about a work project. <b>Check all the true statements.</b>",
   id: 67,
   answerType: "multiple",
   answer: ["Mark and Laura need to work on the Peterson account","The financial report for the Johnston account is completed"],
   level: 17,
   audioUrl: "https://ocw-program.s3.amazonaws.com/Placement-test/Audio/B1/Project+report.mp3",
   options: ["Mark and Laura need to work on the Peterson account", "Laura is working on the Johnston account today", "The financial report for the Johnston account is completed","Mark and Laura have already discussed the strategy for the Miller account", "Laura doesn't agree on discussing the Miller account", "The Peterson report is already finished."]
}, */
];
