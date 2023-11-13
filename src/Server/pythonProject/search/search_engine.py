from search.keywords import extract_keywords
import os
import mysql.connector


class SearchService:
    def __init__(self):
        config = {
            'user': 'root',
            'password': 'Cj20031349',
            'host': '127.0.0.1',
            'database': 'search_engine'
        }
        self.cnx = mysql.connector.connect(**config)
        self.cursor = self.cnx.cursor()
        self.main_path = os.path.dirname(__file__)

    def get_one_seg(self, word):  # segment表中查询一个分词的结果
        sql = "SELECT id, word FROM segment WHERE word = %s"
        self.cursor.execute(sql, (word,))
        return self.cursor.fetchone()

    def get_data_by_split(self, sql, page_size, offset):  # data表中查询该页的全部结果
        sql_getdata = ("SELECT url, title, id FROM data WHERE id IN ( "
                       "SELECT db.data_id FROM ( "
                       "SELECT data_id FROM ( "
                       "{}"
                       ") tb1 "
                       "GROUP BY data_id "
                       "ORDER BY SUM(tidif_value) DESC "
                       "LIMIT %s OFFSET %s "
                       ") db "
                       ")").format(sql)
        self.cursor.execute(sql_getdata, (page_size, offset))
        # 将查询结果组装成字典
        columns = ['url', 'title', 'id']
        datas_tuple = self.cursor.fetchall()
        return [dict(zip(columns, data_tuple)) for data_tuple in datas_tuple]

    # 搜索业务
    def get_data_by_keyword(self, keyword, page_size, page_num):
        offset = page_size * (page_num - 1)
        sql = ""

        # 对输入的关键词进行分词
        words = extract_keywords([keyword], self.main_path)[0]

        flag = True
        for i in range(len(words)):  # 遍历分出的词
            # 获取关键词的 segment
            seg = self.get_one_seg(words[i])
            if seg is None:
                continue
            else:
                seg_id = seg[0]  # 获取segId

            # 通过segId找到去哪张表查找（哪张data_segment_relation表，在建立的时候使用的，这里的100算是魔数了，不规范~）
            idx = seg_id % 100

            # 组合出一个sql语句：用于取各个关键词查出来的data_segment，union的方式去重
            if flag:
                flag = False
            else:
                sql += "\nUNION \n"
            sql += f"SELECT * FROM {'data_seg_relation_' + str(idx)} WHERE seg_id = {seg_id} "

        if sql == "":
            return None

        # 通过sql去获取所有的Data，offset是第几页搜索结果的意思
        datas = self.get_data_by_split(sql, page_size, offset)
        # print(datas)

        # 返回搜索结果
        mp = {"result": datas}
        return mp


if __name__ == '__main__':
    # test
    search = SearchService()
    search.get_data_by_keyword("华为手机", 20, 1)
