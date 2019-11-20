import csv
import fileinput

d = {}

with open("classified.csv") as f:
    reader = csv.reader(f, delimiter=',')

    for i, row in enumerate(reader):
        if i == 0:
            continue

        d[int(row[0])] = row[1]

with open('new_data.csv', 'r') as f, open('final_data.csv', 'w') as g:
    reader = csv.reader(f, delimiter=',')
    writer = csv.writer(g)

    for i, row in enumerate(reader):
        new_row = []

        if i == 0:
            new_row = row + ['class']
        else:
            new_row = row + [d[i]]

        writer.writerow(new_row)

for line in fileinput.input('final_data.csv', inplace=True):
    if fileinput.isfirstline():
        print("ID" + line, end='')
    else:
        print(line, end='')
