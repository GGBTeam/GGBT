from search.keywords import extract_keywords
import os
import mysql.connector
import time
# import paramiko
# import pymysql


class SearchService:
    def __init__(self):
        # ssh_config = {
        #     'hostname': '121.37.45.56',
        #     'port': 22,
        #     'username': 'root',
        #     'password': 'Cj@20031349'
        # }

        config = {
            'user': 'root',
            'passwd': 'Jack@5204',
            'host': '127.0.0.1',
            'database': 'search_engine'
        }
        # 创建SSH连接
        # self.ssh_client = paramiko.SSHClient()
        # self.ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        # self.ssh_client.connect(**ssh_config)
        # 创建数据库连接
        self.cnx = mysql.connector.connect(**config)
        # self.cnx = pymysql.connect(**config)
        self.cursor = self.cnx.cursor(buffered=True)
        self.main_path = os.path.dirname(__file__)

    def __del__(self):
        # 关闭数据库连接和SSH连接
        if hasattr(self, 'cursor') and self.cursor:
            self.cursor.close()
        if hasattr(self, 'cnx') and self.cnx:
            self.cnx.close()
        # if hasattr(self, 'ssh_client') and self.ssh_client:
        #     self.ssh_client.close()

    def execute_query(self, query):
        try:
            self.cursor.execute(query)
        except (mysql.connector.errors.InterfaceError, mysql.connector.errors.OperationalError) as e:
            # 捕获可能表示连接丢失的特定异常
            print(f"执行查询时出错：{e}")
            print("尝试重新连接...")
            self.reconnect()
            # 在重新连接后重试查询
            self.cursor.execute(query)
        except mysql.connector.errors.DatabaseError as e:
            # 捕获数据库错误，例如过载
            print(f"数据库错误：{e}")
            print("等待一段时间后重试...")
            time.sleep(10)  # 可以根据需要调整等待时间
            self.execute_query(query)  # 递归调用以重试查询

    def reconnect(self):
        # 重新建立连接
        config = {
            'user': 'root',
            'passwd': 'Jack@5204',
            'host': '127.0.0.1',
            'database': 'search_engine'
        }
        # 创建数据库连接
        self.cnx = mysql.connector.connect(**config)
        # self.cnx = pymysql.connect(**config)
        self.cursor = self.cnx.cursor(buffered=True)
        self.main_path = os.path.dirname(__file__)

    def get_one_seg(self, word):  # segment表中查询一个分词的结果
        sql = "SELECT id, word FROM segment WHERE word = %s"
        self.cursor.execute(sql, (word,))
        return self.cursor.fetchone()

    def get_data_by_split(self, sql, page_size, offset):  # data表中查询该页的全部结果
        sql_getdata = ("SELECT id, title, url, price, comment_count, store_name, picture, platform FROM data WHERE id IN ( "
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
        columns = ['id', 'title', 'url', 'price', 'comment_count', 'store_name', 'picture', 'platform']
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
