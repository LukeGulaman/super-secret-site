while True:
    print("Starting new round...")

    lives = int(input("Enter live shells: "))
    blanks = int(input("Enter blank shells: "))
    round = 0
    known_rounds = []
    message = ""

    while ((lives + blanks) >= 1):
        t = input("Enter action: ")
        
        if (t == "live"):
            round+=1
            lives -= 1
            message = "Live used."
        elif (t == "blank"):
            round+=1
            blanks -= 1
            message = "Blank used."
        elif (t == "inverter"):
            l = lives
            lives = blanks
            blanks = l
            message = "Inverted shells."
        elif (t == "phone"):
            inp = input("Enter position and shell (pos,shell): ")
            txt = inp.split(",")

            if (len(txt) < 2):
                message = "Action error."
            else:
                pos = txt[0]
                shell = txt[1]
                known_rounds.append(f"[{pos}, {shell}]")
        elif (t == "clear"):
            lives = 0
            blanks = 0
            message = "Round cleared."
        else:
            message = "..."

        chances = 0
        string = "Known shells: "
        if (lives >= 1):
            chances = int((lives/(lives+blanks))*100)
        if (len(known_rounds) > 0):
            string += ", ".join(known_rounds)
        else:
            string = "Known shells: NONE"

        print(f"\n[ROUND {round}] Lives: {lives}, Blanks: {blanks} | Chance of shooting: {chances}%")
        print(f"{string}\n")
        if (not (message == "")):
            print(f"\"{message}\"\n")
