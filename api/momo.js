export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount, phone } = req.body;

  try {
    // 1. GET ACCESS TOKEN
    const tokenRes = await fetch("https://sandbox.momodeveloper.mtn.com/collection/token/", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(
          process.env.MOMO_USER_ID + ":" + process.env.MOMO_API_KEY
        ).toString("base64"),
        "Ocp-Apim-Subscription-Key": process.env.MOMO_SUB_KEY
      }
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. PAYMENT REQUEST
    const paymentRes = await fetch("https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Reference-Id": crypto.randomUUID(),
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": process.env.MOMO_SUB_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount,
        currency: "XAF",
        externalId: "yorix-" + Date.now(),
        payer: {
          partyIdType: "MSISDN",
          partyId: phone
        },
        payerMessage: "Paiement Yorix",
        payeeNote: "Commande Yorix"
      })
    });

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
