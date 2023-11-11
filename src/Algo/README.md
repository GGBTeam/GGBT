<<<<<<< HEAD
# Algo
比较与推荐算法
=======
# 算法实现

## search文件夹

### 实现功能

根据输入文字进行商品检索，输出相关商品的全部信息。

### 使用方法

- 导入search包

```python
from search import *
```

- 实例SearchService类

```python
search_service = SearchService()
```

- 调用SearchService对象的get_data_by_keyword方法，传入三个参数分别为：
  - keyword：用户输入的检索文本；
  - page_size：一个页面请求的数据条数（eg：商品页第一页包含20条商品，该参数即为20）；
  - page_num：当前页码（初始页码为1）。

>>>>>>> dev
