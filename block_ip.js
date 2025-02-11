(async function checkIP() {
    const blockedIPs = ["122.211.63.65"]; // ブロックしたいIPリスト

    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error("IP取得に失敗しました");

        const data = await response.json();
        const userIP = data.ip;
        console.log("取得したIP:", userIP);

        if (blockedIPs.includes(userIP)) {
            alert("アクセスが禁止されています。");

            // 3秒後にリダイレクト
            setTimeout(() => {
                window.location.href = "https://www.google.com"; // リダイレクト先
            }, 3000);
        } else {
            console.log("アクセス許可");
        }
    } catch (error) {
        console.error("IP取得エラー:", error);
    }
})();
