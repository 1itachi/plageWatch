import os
import re


class readDocument:
    def __init__(self, path):
        self.files = os.listdir(path)
        self.docs = {}
        self.path = path

    def parse(self):
        doc_no = ''
        text = ''
        flag = False
        ready = False
        for file in self.files:

            with open(self.path + '/' + file, "rt") as f:
                for line in f:
                    pattern_doc_no = re.search("<DOCNO>(.*?)</DOCNO>", line)
                    if pattern_doc_no is not None:
                        doc_no = pattern_doc_no.group(1).strip()

                    pattern_start_end = re.search("<TEXT>(.*?)</TEXT>", line)
                    pattern_text_start = re.search("<TEXT>(.*?)", line)
                    pattern_text_end = re.search("(.*?)</TEXT>", line)

                    if pattern_start_end is not None:
                        text += pattern_start_end.group(1).strip()
                        ready = True

                    elif pattern_text_start is not None:
                        text += pattern_text_start.group(1).strip()
                        flag = True

                    elif pattern_text_end is not None:
                        text += pattern_text_end.group(1).strip()
                        flag = False
                        ready = True

                    elif flag is True:
                        text += line.strip()+' '

                    if doc_no in self.docs and ready is True:
                        self.docs[doc_no] += text
                        ready = False
                        text = ''

                    elif doc_no not in self.docs and ready is True:
                        self.docs[doc_no] = text
                        text = ''
                        ready = False
                f.close()


if __name__ == "__main__":
    reader = readDocument('./../../IR_data/AP89_DATA/AP_DATA/ap89_collection')
    reader.parse()
    print (reader.docs)
