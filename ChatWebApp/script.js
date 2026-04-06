$(document).ready(function(){
    initializeApp();
})

function initializeApp() {
    //1. Event Listeners Setup
    setupEventListeners();
    //2. Enable Text Area Auto-Resize
    autoResizeTextArea();
    //3. Load Initial Chat History - tempororily loaded fro Browser's Local Storage
    //4. Focus Input on the TextArea
    $("#messageInput").focus();
}

function setupEventListeners() {
    //Sidebar Toggle
    $('#sidebarToggle').on('click',toggleSidebar);
    $('#sidebarOverlay').on('click',toggleSidebar);

    //Enable or Disable Send Button based on TextArea Input
    $('#messageInput').on('input', function(){
        const hasText = $(this).val().trim().length > 0;
        $('#sendBtn').prop('disabled', !hasText);
    });

    //Show coming soon feature for File Attachement
    $('#attachBtn').on('click', function(){
        alert('File attachment feature coming soon!');
    });

    //Enable Click on Send Button Press
    $('#sendBtn').on('click',sendMessage)

    $("#messageInput").on('keypress', function(e){
        if(e.key === 'Enter' && !e.shiftKey){
            if($('#sendBtn').prop('disabled')===false){
                e.preventDefault();
                console.log()
                sendMessage();
            }
        }
    });

    // Start New Chat
    $("#newChatBtn").on('click',startNewChat);

    //Clear Existing Chat
    $("#clearChatBtn").on('click',clearCurrentChat);



}

function toggleSidebar(){
    $('#sidebar').toggleClass('active');
    $('#sidebarOverlay').toggleClass('active');
}

function sendMessage(){
    const messageText = $("#messageInput").val().trim();
    // Non Empty Check
    if(!messageText) return;
    console.log(messageText)
    // Hide the welcome Scren
    $("#welcomeScreen").hide();
    //Add user message to the list and UI
    addMessage(messageText,'user');
    
}

function addMessage(text,sender){
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const senderName = sender === 'user' ? 'You' : 'AI Assistant';
    const senderInitial = sender === 'user' ? 'Y' : 'AI';

    const messageHTML = `
    <div class="message ${sender}">
        <div class="message-header">
            <div class="message-avatar">${senderInitial}</div>
            <span class="message-sender">${senderName}</span>
            <span class="message-time">${time}</span>
        </div>
        <div class="message-content">
            ${formatMessageContent(text)}
        </div>
    </div>
    `;
    $('#typingIndicator').before(messageHTML);
    scrollToBottom();
}

function formatMessageContent(text){
    //Escape HTMl
    let formatted = $('<div>').text(text).html();

    // convert markdown-style code blocks
    formatted = formatted.replace(/```(\w+)?\n(\s\S]*?)```/g,function(match,lang,code){
        return `<pre><code>${code.trim()}</code></pre>`
    });

    //convert inline code
    formatted = formatted.replace(/`([^`]+)`/g,'<code>$1</code>');
    
    // Convert URLs to Links
    formatted = formatted.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank">$1</a>'
    );

    //convert line breaks
    formatted = formatted.replace(/\n/g,'<br>');
    return formatted;

}

function showTypingIndicator(){

}

function hideTypingIndicator(){

}

function scrollToBottom(){

}

function autoResizeTextArea(){
    $("#messageInput").on('input',function(){
        this.style.height= 'auto';
        this.style.height = (this.scrollHeight)+'px';
    });
}

function startNewChat(){
    if(confirm('Start a New Chat? Current Chat will be saved.')){
        // Save Current Chat
        saveChatToHistory();
        // Clear Current Chat Messages
        $('.message').remove();
        // Show t he Welcome Screen
        $("#welcomeScreen").show();
        //Update the Title
        $("#chatTitle").text('New Chat');
        // Close Sidebar on Mobile
        if($(window).width() < 768){
            toggleSidebar();
        }
    }
}

function clearCurrentChat(){
    if(confirm('Clear all messages')){
        $('.message').remove();
         // Show t he Welcome Screen
         $("#welcomeScreen").show();
         //Update the Title
         $("#chatTitle").text('New Chat');
    }
}

function saveChatToHistory(){

}