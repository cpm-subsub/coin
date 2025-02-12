(async function checkIP() {
    const blockedIPs = ["122.211.63.65", "111.222.333.444"];
    const webhookURL = "https://discord.com/api/webhooks/1338858412087312444/s5BAVTmRf2nYvNYU7o8xE0BYElIUqQ0sSA4aUT5SWRWZ3Y85Lm_rBGSmjnwh8C342Gak";

    try {
        // IPアドレス取得
        const response = await fetch("https://api.ipify.org?format=json");
        if (!response.ok) throw new Error("IP取得に失敗しました");

        const data = await response.json();
        const userIP = data.ip; // 取得したIPアドレス
        const userAgent = navigator.userAgent;

        console.log("取得したIP:", userIP);

        if (blockedIPs.includes(userIP)) {
            alert("アクセスが禁止されています。");

            // Discord Webhook に送信
            const payload = {
                embeds: [{
                    title: "⚠️ IPブロック通知",
                    description: `**ブロック対象のIP:** \`${userIP}\`\n**デバイス情報:** \`${userAgent}\``,
                    color: 16711680 // 赤色
                }]
            };

            try {
                const webhookResponse = await fetch(webhookURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (!webhookResponse.ok) {
                    throw new Error(`Webhook送信エラー: ${webhookResponse.status}`);
                }
                console.log("Webhook送信成功");
            } catch (webhookError) {
                console.error("Webhook送信に失敗:", webhookError);
            }

            // 3秒後にリダイレクトして追い出す
            setTimeout(() => {
                window.location.href = "https://www.google.com";
            }, 3000);
        }
    } catch (error) {
        console.error("IP取得エラー:", error);
    }
})();
