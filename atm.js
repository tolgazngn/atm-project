"use strict";

const MAX_ATTEMPTS = 3;
const CORRECT_PASSWORD = "1234";
let balance = 1000;

//functions
function login() {
    let attemptsLeft;

    outer:
    for (attemptsLeft = MAX_ATTEMPTS; attemptsLeft > 0;) {
        const password = prompt("Şifrenizi giriniz.", "").trim();

        //bu kontrol ile kullanıcı deneme yapmadan hakkı azalmaz
        if (isInvalidInput(password)) continue outer;

        if (password == CORRECT_PASSWORD) {
            return true;
        } else {
            attemptsLeft--;

            if (attemptsLeft == 0) {
                return false;
            }

            alert(`Hatalı şifre! Kalan hak: ${attemptsLeft}`);
        }
    }
}

function isInvalidInput(value) {
    return value == null || value == "";
}

function menu() {
    outer:
    while (true) {
        let selection = prompt("1 - Bakiye Görüntüle\n2 - Para Yatır\n3 - Para Çek\n4 - Çıkış", "").trim(); 

        switch (selection) {
            case "1":
                showBalance();
                break;
            case "2":
                depositMoney();
                break;
            case "3":
                withdrawMoney();
                break;
            case "4":
                break outer;
            case null:
                break outer;
            default:
                alert("Geçersiz seçim");
                continue outer;
        }
    }
}

function showBalance() {
    alert(`Bakiyeniz: ${balance}`);
}

function depositMoney() {
    while (true) {
        let amount = +prompt("Miktar giriniz", "").trim();

        if (!isPositive(amount)) continue;

        balance += amount;
        showBalance();
        return;
    }
}

function withdrawMoney() {
    while (true) {
        let amount = +prompt("Miktar giriniz", "").trim();

        if (!isPositive(amount)) continue;

        if (amount > balance) {
            alert("Yetersiz bakiye");
            continue;
        }

        balance -= amount;
        showBalance();
        return;
    }
}

function isPositive(value) {
    return value > 0;
}

//main

if (login()) {
    alert("Hoş geldiniz!");

    menu();

    alert("İyi günler dileriz!");
} else {
    alert("Şifreniz bloke edildi.");
}
