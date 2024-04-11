const {Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions} = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

function card(name,posdesc,negdesc){
    this.name = name;
    this.posdesc = posdesc;
    this.negdesc = negdesc;
}
const deck = [
    //Major Arcana
    new card('**0. The Fool**','You are a blank slate, it is time for a new beginning.','You are unaware of how your actions influence your future.'),
    new card('**1. The Magician**','You have the power to take action without holding back.','Take a step back and examine yourself and your surroundings.'),
    new card('**2. The High Priestess**','Stick with your intuition, don\'t think too much about it.','Think back, meditate and look inwards for a new approach'),
    new card('**3. The Empress**','Your love and care will bring you success.','You are relying too much on others for love.'),
    new card('**4. The Emperor**','Set rules and systems to provide order for your growth.','Your self structure is not working for you, it might be overpowered by internal or external forces.'),
    new card('**5. The Hierophant**','Stick with the established traditions, set of rule or institution.','Your current situation might be too restricting, try the unorthodox approach.'),
    new card('**6. The Lovers**','Strength with your close relationship or choice that you are currently facing.','You are facing inner or outer conflicts that you are dealing with that can affect your relationships.'),
    new card('**7. The Chariot**','You will achieve your goals as long as you stick to your plans.','Examine your aggression and control to achieve your goals.'),
    new card('**8. Strength**','You will accomplish anything you put your mind to.','Focus on your self confidence and unhappiness.'),
    new card('**9. The Hermit**','Self reflect and clear your mind. Focus on yourself.','Your seclusion might be harmful to both yourself and others.'),
    new card('**10. The Wheel of Fortune**','No matter how your luck currently is, change will come so keep that in mind.','Your current circumstances are out of your control, however these circumstances will change.'),
    new card('**11. Justice**','The choices you make, will have long-term effects. Justice will come through right or wrongs!','Focus on what you can do to change the wrongs in your past.'),
    new card('**12. The Hanged Man**','Reflect on actions or decisions that need to be postponed.','You might be putting a lot of effort into something thats not helping you progress in life.'),
    new card('**13. Death**','You are going to go through a major change in yourself or your environment.','You are resisting the change that is approaching. Take your time to let it happen.'),
    new card('**14. Temperance**','Be patient and consider moderation in your actions.','Identify the imabalanced forces in your life, try to find the excessive or lacking areas.'),
    new card('**15. The Devil**','A deal has been made, one that is out of your control.','Take some time to gather yourself as you break off from your chains.'),
    new card('**16. The Tower**','Your foundations, beliefs or values is currently crumbling and a radical change is approaching.','You are afraid of facing change, but the destruction is necessary.'),
    new card('**17. The Star**','You have gone through pain, but you were strong to get through it. This courage will provide blessings','Your lost faith might be why you feel that the world is against you.'),
    new card('**18. The Moon**','Be aware of whats causing fear or anxiety, it might prevent you from seing the safe path ahead.','You are starting to manage your inner turmoil, believe in yourself to clear your confusion.'),
    new card('**19. The Sun**','You are beaming with confidence, inspiration and joy to those around you.','Your optimism and enthusiasm is affected, either blocked by turbulent clouds or shining too brightly.'),
    new card('**20. Judgement**','You are currently reflecting on yourself. Whether these can be small or big, changing them will affect you and your loved ones.','You are your harshest critic, this judgement is holding you back in life.'),
    new card('**21. The World**','You have completed a major milestone in your life and have been renewed because of it.','You are approaching the end of an era, however it does not feel like the journey is complete.'),
    //Wands
    new card('**Ace of Wands**','Take the chance to start your idea.','Take time off to get inspiration to achieve your goals.'),
    new card('**Two of Wands**','You are progressing with your plans.','Reflact and examine how you are achieving your goals.'),
    new card('**Three of Wands**','You have a solid foundation to take the next step for your goals.','You are facing obstacles in your path, start planning future changes that may come up.'),
    new card('**Four of Wands**','Celebrate your achievements with your loved ones.','There is tension or lack of harmony in your support system.'),    
    new card('**Five of Wands**','You will face conflict or competition, use this as a chance for your improvement.','Avoiding or resolving conflicts.'),
    new card('**Six of Wands**','You harnessed your strength and talants to achieve a successful outcome.','You are facing self doubt in your abilities and potential to achieve success.'),
    new card('**Seven of Wands**','Set your boundaries and maintain yourself.','You might be overwhelmed by your challenges or might be too defensive.'),
    new card('**Eight of Wands**','You may experience a sudden, yet steady positive growth.','Your actions might have cause obstacles, forgive yourself and adapt.'),
    new card('**Nine of Wands**','You have overcome many trials, face them with courage and you will attain success.','You may be afraid to face your challenges, try to change your mentality before the fear imprisons you.'),
    new card('**Ten of Wands**','You have overcome your obstacles, and with that success you are burdened with more responsbilities.','You are overcome by circumstances that is negatively impacting you.'),
    new card('**Page of Wands**','There is a drive in you to make new discoveries for the next stage of your life.','You are bombarded with plans that prevents you from progressing.'),   
    new card('**Knight of Wands**','You have passion to achieve something, be wary of the consequences of your actions.','You are frustrated with situations that are out of your control.'),
    new card('**King of Wands**','You will stick to the path that brings your goals into reality.','The aggression to achieve your goals might lead to your failure.'),
    new card('**Queen of Wands**','Your focus and passion will assist you to achieve your goals.','Deflect your focus outward to guide your feelings and emotions.'),
    //Cups
    new card('**Ace of Cups**','Take a chance to form new relationships.','You are enduring emotinal instability.'),
    new card('**Two of Cups**','Relationships are strong and mutually beneficial.','The balance in the relationship is broken, creating negative energy.'),
    new card('**Three of Cups**','Spend quality time with the people you cherish in life.','Your relationship with others is in turmoil.'),
    new card('**Four of Cups**','You are feeling discouraged or unmotivated with your situation.','You have a desire to embrace new ideas, people and places.'),    
    new card('**Five of Cups**','Your past actions is dwelling in your desicions.','You realize the impact of your actions and embrace the consequences for a better future.'),
    new card('**Six of Cups**','You want to connect with your past and reconnect with old memories.','Your history is dictating your future, when it should just be a reference.'),
    new card('**Seven of Cups**','You are trying to grasp fantasies, ground yourself and make a choice.','Your unwillingness to face reality causes you to stay a dreamer.'),
    new card('**Eight of Cups**','It is time to experience change in your life.','Your unwillingness to change your situation leads to uncertainty in your actions.'),
    new card('**Nine of Cups**','The things you desire for is bound to happen.','Reflect on what you really want in your life. Change how you think about what provides fulfillment.'),
    new card('**Ten of Cups**','Your fulfillment and happinness is shared with others to form satisfaction.','Strong bonds with loved ones may actually be broken or twisted.'),
    new card('**Page of Cups**','Be open to new ideas to tackle your surroundings.','Search inwards towards feelings that prevents you to accept yourself.'),   
    new card('**Knight of Cups**','An arrival of something or someone that will emotionally benefit you.','Your emotions are controlling you more than they should.'),
    new card('**King of Cups**','You are balanced and in full control of your emotions.','Your lack of control of your own emotions causes you to control others\' emotions.'),
    new card('**Queen of Cups**','Reflect on your emotional health. Trust your inner voice before you reach out to others.','You are not in sync with your emotions. Reflect how you feel and achieve stability and control of them'),
    //Swords
    new card('**Ace of Swords**','A moment of breakthrough is approaching to provide new perspectives.','Your thoughts are in chaos, take time to reflect on your methods to achieve your goals.'),
    new card('**Two of Swords**','A choice in directly opposing forces may cause imbalance, remain patient and stay cautious.','You are forced with a decisions with two bad outcomes.'),
    new card('**Three of Swords**','Pain and grief is on the horizon, this suffering can help strengthen you for the future.','The difficult moments you face will pass. Focus on your recovery and learn from the pain.'),
    new card('**Four of Swords**','Take a moment to rest and evaluate your position to face new challenges.','Your efforts to continue the struggle might hinder you, you are restless despite having the need to rest.'),    
    new card('**Five of Swords**','Your ambition might take the better of you, will you fight to achieve mutual progress or victory.','You want the conflict to be over to forgive and forget.'),
    new card('**Six of Swords**','You are experiencing a transition filled with regret, focus on moving on for the future.','You have unresolved issues that is preventing you from achieving a smooth transition.'),
    new card('**Seven of Swords**','Deception is afoot, whether from you or someone in your life. Be sneaky and hope the problem is resolved.','Your approach has to change, the deceptions will not go according to plan.'),
    new card('**Eight of Swords**','You have lost control of where you end up in life, be aware of how to attain back control to make decisions.','You have matured and grown to be capable in making informed decisions.'),
    new card('**Nine of Swords**','Your anxiety overwhelms you as the countless possibilities haunt your imagination.','There is a desire to break out of the anxiety that brings back unresolved issues.'),
    new card('**Ten of Swords**','A major disaster will impact you that causes immense pain. Let go of what you have lost so that you can focus on a new path forward.','Where can you go from rock bottom? The climb can only begin with you.'),
    new card('**Page of Swords**','Your ambitions to new ideas or project should be shared with others to build up.','Words have power, don\'t misuse it to demonstrate worthlessness.'),   
    new card('**Knight of Swords**','You are ambitious with your goals, there is no stopping you.','You have a burst of energy to achieve your goals, but no direction to reach it.'),
    new card('**King of Swords**','Use your experience and intelligence to achieve your goals.','The misuse of your mental ability may lead to your downfall.'),
    new card('**Queen of Swords**','Separate your emotions from your judgement. Connect with others with an intellectual understanding.','Your emotions is misplaced in your situation. Find a balance with intellect to not be lead astray.'),
    //Pentacles
    new card('**Ace of Pentacles**','A new beginning will manifest, with it comes great abundance and opportunity.','Reconsider the opportunity that you are considering. Be advised that it might be better than what it seems.'),
    new card('**Two of Pentacles**','You are concerned about keeping two major factors in your life in balance. Take your time and examine why they trouble you.','You are juggling too much to maintain balance. Take a break to re-examine the factors that is causing stress.'),
    new card('**Three of Pentacles**','You have all the requirements needed to achieve a successful beginning towards achieving your goals.','There are conflicts that is delaying your progress to achieve your goals.'),
    new card('**Four of Pentacles**','You have managed to accomplish much of your goals. Don\'t missplace your values after this success.','You are either too defensive or not enough in terms of materialistic things'),    
    new card('**Five of Pentacles**','You will lose something or someone significant. This can also mean to sort out unresolved business.','The tough times are now over, take some time to recover and regain material stability.'),
    new card('**Six of Pentacles**','If you have a good relationship with material posessions you can happily share with others. If not, you will receive support from those who are better off. ','If you have departed with material posessions, do not expect a return. Likewise pay attention to debts you accumulated.'),
    new card('**Seven of Pentacles**','The time and effort that you have spent are going to pay off in the future.','The rewards of your labor are not as significant. Reevaluate your choices to redistribute your resources.'),
    new card('**Eight of Pentacles**','There is a lot of effort you have to understake for a period of time.','Execute your tasks swiftly and great care if you want to be successful.'),
    new card('**Nine of Pentacles**','You are content with the security and freedom that material wealth can bring.','There is a false display of material stability. Either indication of issues or inability to rest.'),
    new card('**Ten of Pentacles**','Everything you have put your efforts into will pay off and create a legacy that will last for generations to come.','Despite enjoying short-term success, there is potential for problems in the long-term.'),
    new card('**Page of Pentacles**','There are lot of work to do, but time is not limited. You will be rewarded for your hard work.','Examine your attitude with your tasks, whether it be a lack of focus or rest.'),   
    new card('**Knight of Pentacles**','Be patient with your duties to make sure your job is properly completed.','Your routine has become complacent and other aspects of your life are neglected.'),
    new card('**King of Pentacles**','Stay in control of your energy and resources in pursuit of your goals.','Change your focus on what it means to achieve success.'),
    new card('**Queen of Pentacles**','Be aware of your principles and support, with wisdom you can raise yourself and others to thrive.','Your focus on material posessions is misplaced which may compromise your long-term goals.')

    ];

const advice=[
  'as I see it, yes.',
  'ask again later.',
  'better not tell you now.',
  'cannot predict now.',
  'concentrate and ask again.',
  'don\'t count on it.',
  'it is certain.',
  'it is decidedly so.'
];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const bot = new Client({
    intents:
    [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions]
});

bot.on("ready", (x) => {
    logger.info('Connected');
    logger.info('Logged in as: '+ x.user.tag);
    bot.user.setActivity("BobaWeebs Squid Game 3 9PM EST Jan 6th");
    //rebuild slash commands
    //bot.application.commands.set([]);
    //build slash commands
    const tarot = new SlashCommandBuilder()
    .setName('tarot')
    .setDescription('Generate a Three Card Spread (that will definetly come true).');

    const suggest = new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Suggest what you want to add to oxbot')
    .addStringOption(option=>
        option.setName('suggestion')
            .setDescription('What is your suggestion?')
            .setMaxLength(240)
            .setRequired(true));

    bot.application.commands.create(tarot);
    bot.application.commands.create(suggest);

})

bot.on('interactionCreate', async (interaction)=>{
    if(!interaction.isChatInputCommand()) return;
    let sleep = async (ms) => await new Promise(r => setTimeout(r,ms));

    if(interaction.commandName === 'tarot'){
        var first = Math.floor(Math.random()*deck.length);
        var second = Math.floor(Math.random()*deck.length);
        while(first==second)
            second = Math.floor(Math.random()*deck.length);
        var third = Math.floor(Math.random()*deck.length);
        while(first==third || second == third)
            third= Math.floor(Math.random()*deck.length);
        interaction.reply('Here is your reading:');
        await sleep(500);
        interaction.channel.send('First card is '+deck[first].name);
        if(Math.floor(Math.random() * 2) == 0){
            interaction.channel.send('The card appears **upright**, which means : '+deck[first].posdesc);
        }else{
            interaction.channel.send('The card appears **reverse**, which means : '+deck[first].negdesc);
        }
        await sleep(500);
        interaction.channel.send('Second card is '+deck[second].name);
        if(Math.floor(Math.random() * 2) == 0){
            interaction.channel.send('The card appears **upright**, which means : '+deck[second].posdesc);
        }else{
            interaction.channel.send('The card appears **reverse**, which means : '+deck[second].negdesc);
        }
        await sleep(500);
        interaction.channel.send('Third card is '+deck[third].name);
        if(Math.floor(Math.random() * 2) == 0){
            interaction.channel.send('The card appears **upright**, which means : '+deck[third].posdesc);
        }else{
            interaction.channel.send('The card appears **reverse**, which means : '+deck[third].negdesc);
        }
    }

    if(interaction.commandName === 'suggest'){
        const comment = interaction.options.getString('suggestion');
        const message = await interaction.reply({content:'Suggestion : '+ comment,fetchReply:true});
        await sleep(100);
        message.react('👍');
        await sleep(100);
        message.react('👎');
    }

})
bot.on('messageCreate', async (msg) => {
    var message=msg.content;
    if (msg.author.bot){
        return;
    }
    let sleep = async (ms) => await new Promise(r => setTimeout(r,ms));
    if (message.startsWith('$')) {
        msg.channel.send('We don\'t do that here.');
    }

    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.startsWith('!')) {

        var args = message.slice(1).split(' ');
        var cmd = args[0];
        var at = args[1];
        switch(cmd) {
            case 'gamble':
                msg.channel.send('uh... you don\'t have anything to gamble but u need help if you are trying.');
                break;
            case 'advice':
                var a = advice[Math.floor(Math.random()*advice.length)];
                msg.channel.send(a);
                break;
            case 'ilyoxbot':
                msg.channel.send('I love you too ' +message.author.id+'.');
                break;
            case 'wechat':
                msg.channel.send('hey '+at);
                await sleep(500);
                msg.channel.send('you have big eyes, small face, i like');
                await sleep(500);
                msg.channel.send('was your wechat');
                break;
            case 'whistle':
                msg.channel.send('https://tenor.com/bDU3q2cxKu3.gif');
                break;
            case 'yabai':
                msg.channel.send('uh... I guess its allowed. If its an image make sure to put spoiler and say its NSFW.');
                break;
            case 'tarot':
                msg.channel.send('Apologies, but I have ascended from **21. The World** and now am a slash command. To summon me and not look like **0. The Fool**, use /tarot.')
                break;
        }
    }
});
bot.login(auth.token);