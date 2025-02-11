async function checkIP() {
    const blockedIPs = ["122.211.63.65"]; // ブロックしたいIPリスト

    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;

        if (blockedIPs.includes(userIP)) {
            alert("アクセスが禁止されています。");
            window.location.href = "https://www.google.com"; // リダイレクト先
        }
    } catch (error) {
        console.error("IP取得エラー:", error);
    }
}

checkIP();
