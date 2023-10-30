# -*- encoding: utf-8 -*-
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from pyecharts.charts import Pie

if __name__ == "__main__":
    word = input("请输入要爬取的商品名称：")
    page_size = int(input("请输入要爬取的页数："))
    # 创建一个浏览器驱动器的对象

    driver = webdriver.Edge(executable_path='msedgedriver.exe')
    # 通过驱动器去打开天猫的首页
    driver.get("https://www.tmall.com")
    time.sleep(2)
    # 找到搜索框
    input_box = driver.find_element(By.XPATH, "/html/body/div[1]/div[3]/div[2]/input")
    input_box.send_keys(word)
    input_box.send_keys(Keys.ENTER)

    names, prices, shops = [], [],  []
    for i in range(page_size):
        # 将滚动条拖到最下面
        driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
        # 停顿3秒，等待数据刷新
        time.sleep(3)

        good_list = driver.find_elements(By.XPATH,'//*[@id="root"]/div/div[2]/div[1]/div[1]/div[2]/div[3]')
        print(good_list)
        # 便利每页所需爬取的内容
        for good in good_list:
            price = good.find_element(By.CLASS_NAME, "Price--priceInt--ZlsSi_M").text,
            name = good.find_element(By.CLASS_NAME, "Title--title--jCOPvpf").text,

            shop = good.find_element(By.CLASS_NAME, "ShopInfo--TextAndPic--yH0AZfx").text
            # 将爬取的数据赋值给空列表中
            if len(name) > 0 and len(price) > 0:
                names.append(name[0])
                prices.append(price[0])
                shops.append(shop)

        driver.find_elements(By.XPATH, ' // *[ @ id = "root"] / div / div[3] / div[1] / div[1] / div[2] / div[4] / div / div')
        # 停顿3秒，等待数据刷新
        time.sleep(3)
    df = pd.DataFrame(
        {
            "价格": prices,
            "标题": names,

            "出版社": shops
        })
    df.to_excel("3.xlsx")

    # 按数量统计出前10名的数据
    sort_data = df.groupby("出版社").size().sort_values(ascending=True).head(10)

    # 进行数据治理。将数据按图表所需要的数据进行融合，重要！！！变为这种格式：[‘xx_xx’，1]
    data = [list(z) for z in zip(sort_data.index.tolist(),
                                 sort_data.values.tolist())]
    # print(data)
    # 绘制饼图
    pip = Pie()
    pip.add(series_name="排名",
            data_pair=data)

    pip.render(path="P_render2.html")