//These are the questions of the test
var questions = [
   {text: "<b>Lucy: </b>*What* is your name? <br><b>Mark:</b>My name's Mark.", id:1, answer: ["What"], level: 1},
   {
       text: "<b>Paul: </b>___ you so much for your help. <br><b>Lucy: </b> You're welcome",
       id:2,
       answer: ["Thank"],
       level: 1,
       options: ["Nothing", "Please", "Thank", "Sorry"]
   },
    {text: "<b>Bob:</b>When *is* your birthday?<br><b>Ashley:</b>It's on April 4th.", id:3, answer: ["is"], level: 1},
   {text: "<b>John: </b>*How* old are you? <br><b>Linda: </b>I'm 20 years old", id:4, answer: ["How"], level: 1}, 
   {text: "<b>Paul: </b>What *do* you do for a living?<br><b>Steve: </b> I'm *a* lawyer. ", id:5, answer: ["do","a"], level: 2},
   {text: "<b>Graig: </b>*Where* are you from?<br><b>Maria: </b>I'm *from* Colombia.<br><b>Graig: </b>Really? I thought you were from Mexico.", id:6, answer: ["Where","from"], level: 2},
   {text: "<b>Karen: </b>Where *does* he live now?<br> <b>Thomas: </b>He lives *in* Barcelona.", id:7, answer: ["does","in"], level: 2},
   {text: "<b>Peter: </b> Now tell me about your sister. How many children does *she* have?<br><b>Jude: </b> She *has* two sons and a daughter", id:8, answer: ["she","has"], level: 2},
   {
       text: "<b>Student 1: </b>____ is that man over there?<br><b>Student 2: </b>He's Paul, our new English teacher.",
       id: 9,
       answer: ["who"],
       level: 3,
       options: ["What", "When", "Who", "Where"]
   },
   {
       text: "<b>Teacher: </b>Whose pencil ___ this? <br><b>Student: </b> I think it's Bob's",
       id: 10,
       answer: ["is"],
       level: 3,
       options: ["are", "does", "do", "is"]
   },
   {
       text: "George has two kids, but he doesn't live with ____. They live with their mother",
       id: 11,
       answer: ["them"],
       level: 3,
       options: ["their", "them", "him", "their"]
   },
   {
       text: "<b>John: </b>Do you know Paul McCartney?<br><b>Paul: </b> No, I don't know ___. Who is he?",
       id: 12,
       answer: ["him"],
       level: 4,
       options: ["his", "he", "him", "she"]
   },
   {text: "<b>Barbara: </b>What *was* your favorite TV program when you were a kid?", id:13, answer: ["was"], level: 4},
   {text: "<b>Jessica: </b>*Did* you go shopping yesterday?<br><b>Andrew: </b>No, I didn't. but I'll go shopping tonight.", id:14, answer: ["did"], level: 4},
   {
       text: "<b>William: </b>How ___ does it take you to get to work in your car?</br><b>Sarah: </b>About 20 minutes in my car.",
       id: 15,
       answer: ["long"],
       level: 4,
       options: ["long", "time", "many", "old"]
   },
   {
    text: "<b>Lisa: </b>_____ do you go to the gym?</br><b>John: </b>About twice a week.",
    id: 16,
    answer: ["How often"],
    level: 4,
    options: ["How often", "When", "Where", "What frequency"]
},
{
    text: "<b>Dad: </b>Look, that could be our new house.</br><b>Daughter: </b>Wow dad! It's such a _______. I really like it.",
    id: 17,
    answer: ["beautiful house"],
    level: 5,
    options: ["beautiful house", "house big", "yellow house", "house large"]
},
{
    text: "<b>Sarah: </b>Hey, I made some cookies. Would you like one?</br><b>Bob: </b>No, thank you. I _______ right now.",
    id: 18,
    answer: ["am not hungry"],
    level: 5,
    options: ["am not hungry", "am not thirsty", "don't have hungry", "don't have thirst"]
},
{
    text: "<b>Lisa: </b>My dad's sister is the funniest person in our family. She always makes us laugh at family gatherings.</br><b>Pete: </b>It's great that your _____ has such a good sense of humor.",
    id: 19,
    answer: ["aunt"],
    level: 5,
    options: ["aunt", "sibling", "niece", "cousin"]
},
{
    text: "<b>Martha: </b>It's really hot today. ________? I could bring you some water if you want.</br><b>Steve: </b>Oh, yes please.",
    id: 20,
    answer: ["Are you thirsty"],
    level: 5,
    options: ["Are you thirsty", "Do you have thirst", "Do you have hungry", "Are you angry"]
},
   {text: "My name's Joe, and I want *to* tell you a little *about* myself. I live in a small town called Greenfield. I'm *a* high school student and I love learning new things. In *my* free time, I enjoy reading books and watching movies. I also like going for walks in the park and playing soccer *with* my friends. I have a pet dog named Max, and he's my best friend. He can't live without me, and I can't live without him either. I think pets make life more interesting. What about you? Do you think pets make life more enjoyable?", id:21, answer: ["to", "about", "a", "my", "with"], level: 6},
   {text: "Hi everyone! I'm Mark and I am *an* engineer. I work for a company named 'Future Tech'. I began working there 3 years *ago*, and I really like my job. I love it because I learn about new technologies and I like my co-workers. They *are* awesome! I live in the city and I like its vibrant energy. In my spare time, I like *to* read books, especially those related to science and technology. I also love to play chess *with* my friends and go for jogs in the morning. I believe staying healthy is as important as working hard.", id:22, answer: ["an", "ago", "are", "to","with"], level: 6},
   {text: "Hi, I'm Billy, and I'd like *to* talk a little *about* myself. I work as *a* gardener in a large park in the city. I love my job because I always enjoy being around nature. I live in a small house near the park. Last year, I adopted a cat from the local animal shelter. She's called Misty and she's now my best friend. We spend a lot *of* time together, especially when I get home from work. Sometimes we sit in the garden and watch the birds until it gets dark. *On* Saturdays, we always watch movies until midnight. Misty loves being on the sofa, and I love watching comedy movies with her", id:23, answer: ["to", "about","a", "of", "on"], level: 6},
     {
       text: "<b>Susan: </b>What ___ your father look like?</br><b>Jessica: </b>He's tall with short, gray hair and wears glasses. He always has a friendly smile on his face",
       id: 24,
       answer: ["does"],
       level: 7,
       options: ["do", "does", "is", "are"]
   },
   {
    text: "<b>Samantha: </b>What are you *gonna* do after you graduate?<br><b>Paul: </b>I think I'll take some time to travel and explore a bit before I jump into a full-time job",
    id: 25,
    answer: ["gonna"],
    level: 7,
    options: ["gonna", "going", "planning", "will"]
},
   {
       text: "<b>Bob: </b>What ___ she like?<br><b>Peter: </b>She's charismatic and really funny!",
       id: 26,
       answer: ["is"],
       level: 7,
       options: ["do", "does", "is", "are"]
   },
   {
       text: "<b>Lisa: </b>What ___ he like?<br><b>Martha: </b>He was generous and kind.",
       id: 27,
       answer: ["was"],
       level: 7,
       options: ["did", "was", "does", "were"]
   },
   {text: "<b>Interviewer: </b>*Is* there anything you'd like to ask?<br><b>Interviewee: </b>Yes, how *much* is the pay for this job?<br><b>Interviewer: </b>This position pays $4,000 a month.", id:28, answer: ["is","much"], level: 8},
   {text: "<b>Mark: </b>How *many* people *are* there at the party now?<br><b>Paul: </b>Around nine or ten", id:29, answer: ["many","are"], level: 8},
   {text: "<b>Graig: </b>Hey Sarah, what's a 'selfie'?<b><br>Sarah: </b>A selfie is just a picture of *yourself|oneself*. It's when you hold the camera with your hands and take a photo of *your|one's* own face.", id:30, answer: ["yourself","your"], level: 8},
   {text: "<b>Charles: </b>Hey Nancy, why are you buying all that food?<b><br>Nancy: </b>There *will* *be* a party in my house tomorrow. You should come.<br><b>Charles: </b>Sure, I will. Thank you.", id:31, answer: ["will","be"], level: 9},
   {text: "<b>Detective: </b>What *were* you doing yesterday at 2:00 p.m.?</br><b>Suspect: </b>I *was* taking a nap.", id:32, answer: ["were","was"], level: 9},
   {text: "<b>Mom: </b>What *was* your brother doing when I called this morning?</br><b>Son: </b>He was right next to me. We *were* playing video games together when you called.", id:33, answer: ["was","were"], level: 9},
   {text: "<b>Dad: </b>What *are* you doing with all those paint cans?</br><b>Emma: </b>I *am* redecorating my room. I wanna try some new colors.", id:34, answer: ["are","am"], level: 9},
   {text: "<b>Carol: </b>Look. *It* *is* raining pretty heavily. You'll need an umbreall if you don't want to get soaked to the bone.</br><b>Wendy: </b>You're right.", id:35, answer: ["it","is"], level: 9},
   {
       text: "<b>Kate: </b>What ____ tonight?</br> <b>Bob: </b>Nothing. I got no plans yet",
       id: 36,
       answer: ["are you doing"],
       level: 10,
       options: ["are you doing", "are you do", "do you do", "did you do"]
   },
   {
       text: "The hospital is ___ the bank",
       id: 37,
       answer: ["opposite"],
       level: 10,
       options: ["in front", "opposite", "next", "among"]
   },
   {
       text: "The books are ___ top of the shelf",
       id: 38,
       answer: ["on"],
       level: 10,
       options: ["on", "in", "under", "between"]
   },
   {
       text: "<b>Linda: </b> You ___ buy shoes in a library.",
       id: 39,
       answer: ["can't"],
       level: 11,
       options: ["should", "must", "are able", "can't"]
   },
   {
       text: "You _____ wear a uniform to school on Fridays. You know it's not mandatory. It's up to you.",
       id: 40,
       answer: ["don't have to"],
       level: 11,
       options: ["couldn't", "must", "don't have to", "shouldn't"]
   },
   {
       text: "I'm sorry I ____ submit the report on time yesterday. My computer broke down.",
       id: 41,
       answer: ["couldn't"],
       level: 11,
       options: ["couldn't", "shouldn't", "can", "can't"]
   },
   {
       text: "There isn't ____ sugar in the pantry to bake a cake, we need to buy some.",
       id: 42,
       answer: ["enough"],
       level: 12,
       options: ["enough", "many", "some", "too much"]
   },
   {
       text: "There aren't ____ apples left in the fruit bowl, it looks like we've eaten them all",
       id: 43,
       answer: ["any"],
       level: 12,
       options: ["some", "the", "an", "any"]
   },
   {
       text: "There are ____ interesting books on the shelf that you might enjoy reading.",
       id: 44,
       answer: ["some"],
       level: 12,
       options: ["a lot", "lots", "much", "some"]
   },
   {
       text: "This summer is ___ last year's.",
       id: 45,
       answer: ["hotter than"],
       level: 13,
       options: ["hotter that", "more hot than", "hotter than", "the hottest that"]
   },
   {
       text: "Mount Everest is ___ peak in the world, but K2 is more difficult to climb.",
       id: 46,
       answer: ["the highest"],
       level: 13,
       options: ["the higher", "higher than", "a higher that", "the highest"]
   },
   {
       text: "I'm proud of you. You're lasagna is now ______ mine.",
       id: 47,
       answer: ["as good as"],
       level: 13,
       options: ["more good", "better", "as good as", "the best"]
   },
   {
       text: "She has been studying French ____",
       id: 48,
       answer: ["for two years"],
       level: 14,
       options: ["since two years", "three years ago", "last week","for two years"]
   },
   {
       text: "<b>Patricia: </b>How long _____ him? <br><b>Margaret: </b>Since high school",
       id: 49,
       answer: ["have you known"],
       level: 14,
       options: ["are you knowing", "can you know", "have you known","does she knew"]
   },
   {
       text: "We haven't seen them *since* last year. We should pay them a visit.",
       id: 50,
       answer: ["since"],
       level: 14
   },
   {
    text: "The new employee was asked to submit a report by Friday, but she hasn't delivered it *yet*.",
    id: 51,
    answer: ["yet"],
    level: 14
},
{
    text: "The books ____ by genre in this library, making it easier for people to find what they want.",
    id: 52,
    answer: ["are sorted"],
    level: 15,
    options: ["sort", "are sorting", "are sorted", "will sort"]
},
{
    text: "The new highway _____ to reduce traffic in the city center. It should be completed by the end of next year.",
    id: 53,
    answer: ["is being built"],
    level: 15,
    options: ["will build","is being built", "was built", "is building"]
},
{
text: "The new play ____ next week at the Old Auditorium",
id: 54,
answer: ["is going to be performed"],
level: 15,
options: ["is going to be performed","is going to perform", "is performed", "is performing"]
},
{
    text: "Don't worry, your report ______ by the end of the day. I'm working on it so you can check it first thing tomorrow morning.",
    id: 55,
    answer: ["will be completed"],
    level: 15,
    options: ["will be completed", "will complete", "was submitted", "was complete"]
},
   {
       text: "When I first moved to New York, the loud city noise and the many people *were* very new to me. I grew up in a small town, so this was a big change for me. In fact, before moving to New York, I *had* never seen a building taller *than* three stories! But over time, I got used *to* the busy city life and its tall buildings. I think I *have* adapted myself very well. I went to college, got a good job and I recently got promoted to operations manager of a big company.",
       id: 56,
       answer: ["were", "had", "than", "to", "have"],
       level: 16
   },
   {
       text: "Last year, I decided *to* adopt a puppy from the local shelter. I *had* never taken care of a dog before, so it was a big step for me. However, I quickly got used to the routine of feeding and walking her. Now, I can't imagine life without my dog. She *has* brought so much joy into my life. In fact, I've *been* thinking of adopting another dog, but my girlfriend says having one dog is more *than* enough.",
       id: 57,
       answer: ["to", "had", "has", "been", "than"],
       level: 16
   },
   {
       text: "When I first started learning guitar, I found it very difficult. Especially because it was my first musical instrument and I *had* never studied music before. *At* the beginning, the strings hurt my fingers so bad, but as time went by, I got used to the feeling of the strings and then fell in love *with* the instrument. It's *been* almost three years since I first started my guitar lessons, and I think it's the best decision I've *made* in my life. I think playing the guitar is really my thing!",
       id: 58,
       answer: ["had", "At", "with", "been", "made"],
       level: 16
   },
   {
       text: "It took me a while to ______ driving on the right side of the road when I moved to the United States. In my home country, we drive on the left side.",
       id: 59,
       answer: ["get used to"],
       level: 17,
       options: ["used to", "accustom", "be used","get used to"]
   },
   {
       text: "I ______ play basketball in high school, but I stopped when I went to college due to my busy schedule.",
       id: 60,
       answer: ["used to"],
       level: 17,
       options: ["used to", "accustomed", "was used to", "got used to"]
   },
   {
       text: "In a few months, _____ the new software we're implementing. It might seem complicated now, but it will become second nature with practice.",
       id: 61,
       answer: ["you'll be used to"],
       level: 17,
       options: ["you'll get used", "he'll be accustomed", "you'll be used to", "he will accustom to"]
   },
   {
       text: "If I ______ you, I wouldn't worry about money, I'd focus more on making it.",
       id: 62,
       answer: ["were"],
       level: 18,
       options: ["am", "were", "believe", "would be"]
   },
   {
       text: "I'd never move to a new city if I _____ have a good support system there. Having friends and family close by is essential to me.",
       id: 63,
       answer: ["didn't"],
       level: 18,
       options: ["would", "didn't", "shouldn't", "need to"]
   },
   {
       text: "I'm still feeling a bit under the weather, but I'll definitely go to the party if I ___ better tomorrow.",
       id: 64,
       answer: ["feel"],
       level: 18,
       options: ["will feel", "will be", "felt","feel"]
   },
   {
       text: "He _____ that he had lived in Spain when he was a kid.",
       id: 65,
       answer: ["told me"],
       level: 19,
       options: ["said me", "mention me", "tells", "told me"]
   },
   {
       text: "When she was a kid, she promised that she _____ a famous book writer, and she did it.",
       id: 66,
       answer: ["would become"],
       level: 19,
       options: ["is going to become", "plan to become", "would become", "won't become"]
   },
   {
       text: "She asked me _______ come late again.",
       id: 67,
       answer: ["not to"],
       level: 19,
       options: ["don't", "not to", "please not", "no"]
   },
   {
       text: "We _______ arrived on time if the traffic hadn't been so bad.",
       id: 68,
       answer: ["would've"],
       level: 20,
       options: ["would've", "wouldn't", "had", "would"]
   },
   {
       text: "If you had studied before the test, you _____ failed it.",
       id: 69,
       answer: ["wouldn't have"],
       level: 20,
       options: ["hadn't", "didn't", "would never", "wouldn't have"]
   },
   {
       text: "What _______ done in that situation if you were me?",
       id: 70,
       answer: ["would you have"],
       level: 20,
       options: ["would you", "would you have", "was being", "had you"]
   },
   {
    text: "I wish I *had* a better job. I don't enjoy this kind of work",
    id: 71,
    answer: ["had"],
    level: 20,
    options: ["had", "would have", "would have had", "have"]
},
{
    text: "Despite facing challenges, the entrepreneur decided to ____ and pursue her dream of starting a business.",
    id: 72,
    answer: ["carry on"],
    level: 21,
    options: ["carry on", "carry off", "carry out", "carry away"]
},
{
    text: "The manager asked the employee to _____ the report before submitting it to the client.",
    id: 73,
    answer: ["go over"],
    level: 21,
    options: ["go over", "go along", "go by", "go off"]
},
{
    text: "The sudden change in plans caught everyone ____ and led to some confusion.",
    id: 74,
    answer: ["off guard"],
    level: 21,
    options: ["off guard", "on guard", "under guard", "in guard"]
},
{
    text: "The new employee was able to _____ quickly with her colleagues, creating a positive work environment.",
    id: 75,
    answer: ["get along"],
    level: 21,
    options: ["get along", "get off", "get on", "get by"]
},
{
    text: "<b>Mia:</b>So, is Tom still on board for the road trip this weekend? I need to know so I can book the accommodations.<br><b>Liam:</b>Honestly, Mia, I wouldn't count on it. You know how he is. Last week, he was all excited about the trip, and now he's talking about visiting his cousin instead.<br><b>Mia:</b>That's classic Tom! It's impossible to make solid plans with him. One minute he's in, the next he's out. It's like he's always *changing* *his* mind. I love the guy, but his indecisiveness can be really frustrating.",
    id: 76,
    answer: ["changing","his"],
    level: 22,
},
{
    text: "<b>Sarah:</b>I've noticed that groceries and utility bills have gone up a lot lately. It's really stretching my budget.<br><b>Mia:</b>Absolutely, it's the same for me. I've been picking up extra shifts at work just to *make* *ends* meet. Sometimes is not easy to cover the essentials, you know?",
    id: 77,
    answer: ["make","ends"],
    level: 22,
},
{
    text: "<b>Emily:</b>Tom, I've noticed in the last few meetings you've hesitated to give your honest opinion on some critical issues. It's important for the team that you don't *beat* around the *bush* and instead go straight to the point. Clear communication is key to our success.",
    id: 78,
    answer: ["beat","bush"],
    level: 22,
},
];