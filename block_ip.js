(async function checkBan() {
    const blockedIP = "223.218.235.61", "114.184.0.215"; // BAN対象のIP
    const blockedDevice = "Mozilla/5.0 (Linux; Android 13; A101XM Build/TKQ1.221013.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36"; // BAN対象のデバイス情報

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
                    description: `**ブロック理由:** 荒らし君は死んでもろて\n**IP:** \`${userIP}\`\n**デバイス情報:** \`${userAgent}\``,
                    color: 16711680, // 赤色
                }]
            };

            try {
                const webhookResponse = await fetch(webhookURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                // Webhookレスポンスを確認
                const responseData = await webhookResponse.json(); // レスポンスデータを取得
                if (!webhookResponse.ok) {
                    throw new Error(`Webhook送信エラー: ${webhookResponse.status}`);
                }
                console.log("Webhook送信成功", responseData);
            } catch (webhookError) {
                console.error("Webhook送信に失敗:", webhookError);
            }

            // 3秒後にリダイレクトして追い出す
            setTimeout(() => {
                window.location.href = "https://ja.wikipedia.org/wiki/%E8%8D%92%E3%82%89%E3%81%97";
            }, 100);
        }
    } catch (error) {
        console.error("エラー:", error);
    }
})();
