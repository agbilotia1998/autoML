import csv

l = []

with open('preprocessed_data.csv', 'r') as f:
    reader = csv.reader(f, delimiter=',')
    
    for i, row in enumerate(reader):
        if i == 0:
            continue

        if i == 500:
            break

        temp = [float(x) for x in row]

        if sum(temp[1:]) > 2:
            t = [x for x in temp[1:]]
            l.append(t)

with open('pre_data.csv', 'w') as f:
    writer = csv.writer(f)

    writer.writerows(l)           
