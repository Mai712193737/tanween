function subscribe() {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message');
    if (email && email.includes('@')) {
        message.style.color = 'greenyellow';
        message.textContent = "شكرًا لوثوقك بنا!";
    } else {
        message.style.color = 'red';
        message.textContent = "الرجاء إدخال بريد إلكتروني صحيح.";
    }
}