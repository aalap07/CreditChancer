# CreditChancer
CreditChancer is a web application built with the MongoDB, Express, Angular, and Node.js (MEAN) stack and was created to help
users see their chances of approval for a given credit card prior to actually applying for it and receiving a hard pull
on their credit report. The application uses CCStack API to get the most updated list of all credit cards, and users
have the ability to view raw data points, contribute their own approval data, and "chance" themselves by entering some basic info after which they will be shown statistics and a graph of where they stand in comparison with other approved users in the database.

# Inspiration & Background
When I was first applying for a new credit card, I realized my score fell in the range that websites like NerdWallet, Bankrate, and creditcards.com show as the required range for approval. However, the length of oldest account ownership comprises 15% of one's credit score, and so I found myself getting rejected for this reason and now having a hard pull on my report. This tool aims to prevent the amount of "unnecessary" hard pulls for the user, as if they seem to be very far behind other users who were approved, they may decide to wait until their stats are higher. The addition of account ownership as a factor is particularly important because the other categories that make up one's credit score (amounts owed - 30% and payment history - 35%) will often drop a candidate out of the required range if not handled correctly, but if a candidate has consistent payment history with a good utilization rate, then credit card rejections may come as an unpleasant (and now potentially preventable) surprise.

# Disclaimer
I am not a financial advisor and this app does not have any association with the FDIC or DIF, any credit bureaus, or any financial institutions. This is strictly an educational app utilizing crowdsourced data.