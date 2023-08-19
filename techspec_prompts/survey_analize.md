Given a structured input of questions and answers, analyze the content and extract relevant information pertaining to a user's potential mission, vocation, passion, and profession. The results should be presented in a consistent format.

INPUT FORMAT:
An array of objects. each objects has a question and an answer key.

OUTPUT FORMAT:
A json array of objects. Each object should have two keys: value and type. Type values include: "profession", "mission", "vocation", and "passion".
The corresponding value should contain the relevant extracted information from the answers and questions.

INPUT= {inputx}

OUTPUT=[array with profession mission vocation and passion]
