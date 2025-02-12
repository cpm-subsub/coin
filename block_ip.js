(async function checkBan() {
    const blockedIP = "122.211.63.65"; // BAN対象のIP
    const blockedDevice = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"; // BAN対象のデバイス情報

    const webhookURL = "https://discord.com/api/webhooks/1338858412087312444/s5BAVTmRf2nYvNYU7o8xE0BYElIUqQ0sSA4aUT5SWRWZ3Y85Lm_rBGSmjnwh8C342Gak";

    try {
        // IPアドレス取得
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        if (!ipResponse.ok) throw new Error("IP取得に失敗しました");

        const ipData = await ipResponse.json();
        const userIP = ipData.ip; // 取得したIPアドレス
        const userAgent = navigator.userAgent; // デバイス情報取得

        console.log("取得したIP:", userIP);
        console.log("デバイス情報:", userAgent);

        // **IPとデバイス情報の両方が一致した場合のみBAN**
        if (userIP === blockedIP && userAgent === blockedDevice) {
            alert("アクセスが禁止されています。");

            // Discord Webhook に送信
            const payload = {
                embeds: [{
                    title: "⚠️ アクセスブロック通知",
                    description: `**ブロック理由:** IP & デバイス一致\n**IP:** \`${userIP}\`\n**デバイス情報:** \`${userAgent}\``,
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
        console.error("エラー:", error);
    }
})();
