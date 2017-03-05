var moment = require('moment');
moment().format();
var date = moment().subtract(8,'hours');

const Discord = require('discord.js');
// const music = require('discord.js-music');
const client = new Discord.Client();

var cleverbot = require("cleverbot.io"),
bot = new cleverbot("YOUR_API_USER", "YOUR_API_KEY");
bot.setNick("CaeoBot");

// music(client, {
// 	prefix: '!!',     // Prefix.
// 	global: false,   // Server-specific queues.
// 	maxQueueSize: 600 // Maximum queue size0.
// });

var inVoice = null;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determineResponseMood(msg, keywordArray, blacklistArray){
  for (let index = 0; index < keywordArray.length; ++index) {
    if (msg.includes(keywordArray[index])){
      return true;
    }
  }
  return false;
}

function determinesmithAwakened(author)
{
  var epsilon = Math.random();
  if(author === caeoID){
      epsilon = Math.random();
      if (epsilon <= 0.05){
        return true;
      }
      return false;
    }
    else{
      if (epsilon <= 0.01){
        return true;
      }
      return false;
    }
}

function printLine(lineArray, message)
{
  var resp = getRandomInt(0,lineArray.length-1);
  return message.channel.sendMessage(lineArray[resp]);
}

function printLineWithName(lineArray, message, name)
{
  var resp = getRandomInt(0,lineArray.length-1);
  var smithString = lineArray[resp];
  smithString = smithString.replace("Mr. Anderson", name);
  return message.channel.sendMessage(smithString);
}

function joinVoiceChannel(voiceChannel,message){
  if(voiceChannel!=undefined || voiceChannel!=null){
    voiceChannel.join();
    inVoice = voiceChannel;
  }
  else{
    return printLine(tsundere,message);
  }
  return;
}

function leaveVoiceChannel(voiceChannel){
  if(voiceChannel!=undefined || voiceChannel!=null){
    return voiceChannel.leave();
  }
}

function getSegmentOfDay(date){
  var curHr = date.hour();
  if (curHr < 10) {
    return 'breakfast';
    // console.log('good morning')
  } else if (curHr < 16) {
    return 'lunch';
    // console.log('good afternoon')
  } else {
    return 'dinner';
    // console.log('good evening')
  }
}

client.on('ready', () => {
  console.log('>8U');
  bot.create(function (err, session) {
    if(err){
      console.log('not clever');
    }
  });
});

client.on('message', message => {
  var msg = message.content.toLocaleLowerCase().trim();
  var mentionedBot = message.isMentioned(caeobotID);
  var mentionedCaeo = message.isMentioned(caeoID);
  var author = message.author.id;
  var user = message.author.username;
  var discriminator = message.author.discriminator;
  userString = '*'+user+'*';
  var isCommand = msg.startsWith("yo,");

  if(isCommand){
    var cword=msg.substring(3).trim().split("<", 1)[0].trim();
    switch(cword){
      case 'treefacts':
        printLine(coffeefacts, message);
        break;
      case 'partywithfred':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage(';;play https://www.youtube.com/watch?v=eh7lp9umG2I');
        break;
      case 'sandstorm':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage(';;play https://www.youtube.com/watch?v=nqLArgCbh70');
        break;
      case 'wigglestorm':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage('/play https://www.youtube.com/watch?v=nqLArgCbh70');
        break;
      case 'killfred':
        message.channel.sendMessage(';;leave');
        break;
      case 'join':
        joinVoiceChannel(message.member.voiceChannel,message);
        break;
      case 'leave':
        leaveVoiceChannel(inVoice);
        break;
      case 'knocknock':
        var datseg=getSegmentOfDay(date);
        var caeoslawString = 'Caeoslaw for '+datseg+'.';
        message.channel.sendMessage(caeoslawString);
        break;
      case 'shia':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage(';;play https://www.youtube.com/watch?v=o0u4M6vppCI');
        break;
      case 'cena':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage(';;play https://www.youtube.com/watch?v=k0MALLWxwqw');
        break;
      case 'do you like sand':
        message.channel.sendMessage('I don\'t like sand. It\'s coarse and rough and irritating and it gets everywhere.');
      case 'fredmoe':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage(';;play http://listen.moe:9999/stream.m3u');
        message.channel.sendMessage(';;repeat');
        break;
      case 'partywithgabe':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage(';;play https://youtu.be/7SiimxmB-Uw');
        break;
      case 'smokeweed':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage(';;play https://www.youtube.com/watch?v=GeOFJ64nq4o');
        break;
      case 'rekt':
        joinVoiceChannel(message.member.voiceChannel,message);
        message.channel.sendMessage(rekt);
        break;
      case 'ratewaifu':
        var firstMention='<'+msg.substring(3).trim().split("<", 2)[1].trim();
        if(mentionedCaeo){
          rng = -1*((Math.floor(Math.random() * (9002)) + 0 + Math.random()).toFixed(2));
          message.channel.sendMessage('I\'d rate '+ firstMention + ' a **'+rng.toString()+'/100** :hearts:');
        }
        else if(mentionedBot){
          message.channel.sendMessage('*I am alpha and omega, the beginning and the end. I am that which is, which was, and is yet to come... and you will know my name when I lay my vengeance upon you!*');
        }
        else {
          rng = (Math.floor(Math.random() * (1000 - 101 + 1)) + 101 + Math.random()).toFixed(2);
          message.channel.sendMessage('I\'d rate '+ firstMention + ' a **'+rng.toString()+'/100**');
        }
        break;
      default:
    }
  }
  else if(!isCommand && mentionedBot){
        bot.ask(msg, function (err, response) {
          if(err) {
            // printLine(tsundere,message);
            if(msg.includes('yo')){
              var epsilon=0;
            }
            else{
              epsilon = Math.random();
            }
            if (epsilon <= 0.15){
              return printLineWithName(agentSmith, message, userString);
            }
            else if (epsilon > 0.15 && epsilon < 0.8){
              return printLine(caeoResponses, message);
            }
            else{
              return printLine(angerResponses, message);
            }
          }
          else{
            return message.reply(response);
          }
        });
      }
  else if(!isCommand && !mentionedBot){
    if(author != caeobotID)
    {
      //determine which response to trigger
      var normalResponse = determineResponseMood(msg,normalResponseKeywords);
      var angryResponse = determineResponseMood(msg,angryResponseKeywords);
	    var kickResponse = determineResponseMood(msg,kickResponseKeywords);
      var condiResponse = determineResponseMood(msg,condiResponseKeywords);
      var caeobaltResponse = determineResponseMood(msg,caeobaltResponseKeywords);
      var smithAwakened = determinesmithAwakened(author);
      if(msg.includes('pizza'))
      {
        return message.channel.sendMessage('<:rareveggie:245383947247288320>');
      }
      if(msg.includes('>8u')){
        return message.channel.sendMessage('>8U');
      }
      else if(smithAwakened){
        return printLineWithName(agentSmith, message, userString);
      }
      else
      {
        if (normalResponse && !angryResponse && !caeobaltResponse && !condiResponse && !kickResponse){
          var epsilon = Math.random();
          if (epsilon <= 0.2){
            return printLine(angerResponses, message);
          }
          else{
            return printLine(caeoResponses, message);
          }
        }
        else if (normalResponse && angryResponse || angryResponse){
          return printLine(angerResponses, message);
        }
        else if (normalResponse && condiResponse ||condiResponse){
          return printLine(condiResponses, message);
        }
        else if (normalResponse && caeobaltResponse || caeobaltResponse){
          return printLine(agreeResponses, message);
        }
        else if (normalResponse && kickResponse || kickResponse){
          return printLine(kickResponses, message);
        }
      }
    }
  }
});

client.login('YOUR TOKEN');

var userString;
var caeoID = 'CAEO_ID';
var caeobotID = 'BOT_ID';

var normalResponseKeywords = ['caeo','cae','mizugorou','kevin'];
var angryResponseKeywords = ['herbicide','tea','fuck','die', 'nopal', 'cactus', 'succulent'];
var kickResponseKeywords = ['kick','boot','punt'];
var condiResponseKeywords = ['condi','engi','conditional'];
var caeobaltResponseKeywords = ['caeobalt', 'balt','caerimson','caeorimson','shield'];

var caeoResponses =
['what',
'WHAT',
'what up fam',
'yo',
'\'sup broffet',
'yoohoo',
'\\\\(* o *\\\\) =3 =3'
];

var angerResponses =
[ '>8U',
  '>8u',
  '>8UUUUUUUUUUU',
  'WTF',
  'wTF',
  'eTF',
  'ETF',
  'wtf',
  'WHAT THE FUCK',
  '.',
  '...',
  'WHAT EHT FUCK',
  'what THE FUCK',
  'WHAT HEU HFUHCUGK',
  'LGDFSKJFGHD',
  'hEY',
  'what the actual fuck',
  'can you not stand there',
  '?!?!?!?'];

var kickResponses =
[ '>8U',
  'WTF',
  'OW',
  'http://tinyurl.com/kickedcaeo',
  'http://tinyurl.com/caeokicked'];

var agreeResponses =
['ok',
  'OK',
  'sure',
  'absolutely',
  'OH HELL YEAH',
  'TOTALLY MAN',
  'YES',
  'OH SHIT IT\'S LIT',
  'ye',
  'YE',
  'http://tinyurl.com/caeobalt',
  '8)'];

var condiResponses =
['*sweats condily*',
  '*flexes condily*',
  'NO.',
  '\\ o / P I Z Z A B O I S \\ o /',
  '*Determination.*',
  '<:rareveggie:245383947247288320>',
  '*BIG SORD SMASH*',
  'ᕙ(⇀‸↼‶✿)ᕗ',
  '**SHIELD ENGI**'
];

var agentSmith =
['You hear that Mr. Anderson?... That is the sound of inevitability... It is the sound of your death...',
  'You\'re empty.',
  'Never send a tree to do a machine\'s job.',
  'I am you.',
  'We\'re not here because we\'re free. We\'re here because we\'re not free.',
  'We are here because of you, Mr. Anderson. We\'re here to take from you what you tried to take from us.',
  'Yes, me.',
  'Me... me... me...',
  'The best thing about being me... There are so many "me"s.',
  'You look surprised to see me, again, Mr. Anderson. That\'s the difference between us. I\'ve been *expecting* you.',
  'Cookies need love like everything does.',
  'Can you feel it Mr. Anderson? Closing in on you? Oh I can, I really should thank you after all. It was, after all, it was your life that taught me the purpose of all life. The purpose of life is to end.',
  'Hmm, Mr. Anderson. You disappoint me.',
  'Tell me, Mr. Anderson... what good is a phone call... if you\'re unable to speak?',
  'Good bye, Mr. Anderson.',
  'I\'m going to enjoy watching you die, Mr. Anderson.',
  ':evergreen_tree: :fire:',
  'helo children'
  ];

  var tsundere =
[ 'B-Baka!',
  'Urusai, urusai, urusai!!',
  'No way! Why would I like YOU',
  'It\'s not like I LIKE you',
  'Id... Idiot!',
  'Hmph! Don\'t get in my way!',
  '>_<...',
  'Huh!? Y-you sicko!',
  'Ah... is that true...?',
  'Eeeeh?',
  'B-but I never got to...!',
  'N-No, it\'s not like I did it for you! I did it because I had freetime, that\'s all!" ┐(￣ヘ￣;)┌',
  'I like you, you idiot!',
  'BAKAAAAAAAAAAAAAAA!!!!! YOU\'RE A BAKAAAAAAA!!!!',
  'I\'m just here because I had nothing else to do!',
  'You\'re such a slob!',
  'You should be grateful!',
  'Can you be ANY MORE CLUELESS?',
  'HEY! It\'s a privilege to even be able to talk to me! You should be honored!',
  'T-Tch! S-Shut up!',
  'You\'re free anyways, right?',
  'I don\'t need help from the likes of you!... but if you insist...',
  'FROM THIS MOMENT ON, YOU\'RE MY RIVAL!!'
  ];

  var coffeefacts=
  [ 'Legend has it a 9th-century Ethiopian goat herder discovered coffee by accident when he noticed how crazy the beans were making his goats.',
    'New Yorkers drink almost 7 times more coffee than other cities in the US.',
    'Coffee is a psychoactive. And at high doses it can make you see things… It can also kill you…',
    'The lethal dose of caffeine is roughly 100 cups of coffee.',
    'A French doctor in the 1600s suggested Cafe Au Laits for patients, inspiring people to begin adding milk to coffee.',
    'The French philosopher Voltaire is said to have drank 50 cups of coffee a day. Because he ruled.',
    'Espresso is regulated by the Italian government because it is considered an essential part of their daily life',
    'Hawaii is the only state that commercially grows coffee.',
    'In the ancient Arab culture there was only one way a woman could legally divorce: If her husband didn’t provide enough coffee.',
    'Coffee beans are actually the pit of a berry, which makes them a fruit. The best fruit.',
    'Brewed espresso has 2.5% fat, while filtered coffee contains 0.6% fat.',
    'Johan Sebastian Bach wrote an opera about a woman who was addicted to coffee.',
    'There is a way to brew coffee with marijuana in it and it is described as producing a “dreamy” kind of coffee buzz.',
    'Unlike the hip 20-something Baristas in the US, in Italy the average Barista age is 48, and it is a very respected profession.',
    'In the 1600s there was a controversy over whether or not Catholics could drink coffee, luckily Pope Clement VIII said it was okay.',
    'No matter what people tell you, caffeine cannot help you sober up.',
    'The first webcam was invented at The University of Cambridge to let people know if the coffee pot was full or not.',
    'There is a spa in Japan that lets you bathe in coffee, tea, or wine. I wouldn’t drink it though…',
    'This is the most expensive drink at Starbucks: $23.50, with 16 shots of espresso or 1400mg of caffeine.',
    'Before coffee caught on in the US in the 1700s, beer was breakfast drink of choice. Which is only slightly less awesome.',
    'Irish coffee was actually invented to warm up cold American plane passengers leaving from Ireland.',
    'Teddy Roosevelt is and was the greatest American coffee drinker, consuming a gallon a day.'
    ];

  var rekt='☐ Not rekt ☑ Rekt ☑ Really Rekt ☑ Tyrannosaurus Rekt ☑ Cash4Rekt.com ☑ Grapes of Rekt ☑ Ship Rekt ☑ Rekt markes the spot ☑ Caught rekt handed ☑ The Rekt Side Story ☑ Singin\' In The Rekt ☑ Painting The Roses Rekt ☑ Rekt Van Winkle ☑ Parks and Rekt ☑ Lord of the Rekts: The Reking of the King ☑ Star Trekt ☑ The Rekt Prince of Bel-Air ☑ A Game of Rekt ☑ Rektflix ☑ Rekt it like it\'s hot ☑ RektBox 360 ☑ The Rekt-men ☑ School Of Rekt ☑ I am Fire, I am Rekt ☑ Rekt and Roll ☑ Professor Rekt ☑ Catcher in the Rekt ☑ Rekt-22 ☑ Harry Potter: The Half-Rekt Prince ☑ Great Rektspectations ☑ Paper Scissors Rekt ☑ RektCraft ☑ Grand Rekt Auto V ☑ Call of Rekt: Modern Reking 2 ☑ Legend Of Zelda: Ocarina of Rekt ☑ Rekt It Ralph ☑ Left 4 Rekt ☑ www.rekkit.com ☑ Pokemon: Fire Rekt ☑ The Shawshank Rektemption ☑ The Rektfather ☑ The Rekt Knight ☑ Fiddler on the Rekt ☑ The Rekt Files ☑ The Good, the Bad, and The Rekt ☑ Forrekt Gump ☑ The Silence of the Rekts ☑ The Green Rekt ☑ Gladirekt ☑ Spirekted Away ☑ Terminator 2: Rektment Day ☑ The Rekt Knight Rises ☑ The Rekt King ☑ REKT-E ☑ Citizen Rekt ☑ Requiem for a Rekt ☑ REKT TO REKT ass to ass ☑ Star Wars: Episode VI - Return of the Rekt ☑ Braverekt ☑ Batrekt Begins ☑ 2001: A Rekt Odyssey ☑ The Wolf of Rekt Street ☑ Rekt\'s Labyrinth ☑ 12 Years a Rekt ☑ Gravirekt ☑ Finding Rekt ☑ The Arekters ☑ There Will Be Rekt ☑ Christopher Rektellston ☑ Hachi: A Rekt Tale ☑ The Rekt Ultimatum ☑ Shrekt ☑ Rektal Exam ☑ Rektium for a Dream ☑ www.Trekt.tv ☑ Erektile Dysfunction';
