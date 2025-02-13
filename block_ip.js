(async function checkBan() {
    const blockedIPs = ["223.218.235.61", "114.184.0.215", "122.211.63.65"]; // BAN対象のIPリスト
    const blockedDevices = [
        "Mozilla/5.0 (Linux; Android 13; A101XM Build/TKQ1.221013.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
    ]; // BAN対象のデバイス情報リスト

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

        // **IP または デバイス情報のどちらかがBANリストにあれば処理を実行**
        if (blockedIPs.includes(userIP) || blockedDevices.includes(userAgent)) {
            alert("サイトは更新されたのでこちらのサイトにてお願いします");

            // Discord Webhook に送信
            const payload = {
                embeds: [{
                    title: "⚠️ アクセスブロック通知",
                    description: `**ブロック理由:** 不正アクセス検知\n**IP:** \`${userIP}\`\n**デバイス情報:** \`${userAgent}\``,
                    color: 16711680, // 赤色
                }]
            };

            // 500ms 待機してから送信 (レートリミット対策)
            setTimeout(async () => {
                try {
                    const webhookResponse = await fetch(webhookURL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });

                    console.log("Webhook送信ステータス:", webhookResponse.status);

                    if (!webhookResponse.ok) {
                        throw new Error(`Webhook送信エラー: ${webhookResponse.status}`);
                    }

                    console.log("Webhook送信成功");
                } catch (webhookError) {
                    console.error("Webhook送信に失敗:", webhookError);
                }
            }, 500);

            // 0.1秒後にリダイレクトして追い出す
            setTimeout(() => {
                window.location.href = "https://coincoin/";
            }, 100);
        }
    } catch (error) {
        console.error("エラー:", error);
    }
})();
