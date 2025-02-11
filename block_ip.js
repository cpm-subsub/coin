(async function checkIP() {
    const blockedIPs = ["122.211.63.65"];

    try {
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();
        const userIP = data.query; // IPアドレス取得

        console.log("取得したIP:", userIP);

        if (blockedIPs.includes(userIP)) {
            alert("アクセスが禁止されています。");
            window.location.href = "https://www.google.com"; // リダイレクト先
        } else {
            console.log("アクセス許可");
        }
    } catch (error) {
        console.error("IP取得エラー:", error);
    }
})();
