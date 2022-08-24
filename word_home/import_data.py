import xlrd  # 导入库
def get_data_fromexcel(xlsx):
    print('All sheets: %s' % xlsx.sheet_names())
    sheet1 = xlsx.sheets()[0]    # 获得第1张sheet，索引从0开始
    sheet1_name = sheet1.name    # 获得名称
    sheet1_cols = sheet1.ncols   # 获得列数
    sheet1_nrows = sheet1.nrows  # 获得行数
    print('Sheet1 Name: %s\nSheet1 cols: %s\nSheet1 rows: %s' % (sheet1_name, sheet1_cols, sheet1_nrows))
    data = []

    for i in range(1,sheet1_nrows):  # 逐行打印sheet1数据

        row = sheet1.row_values(i)
        data.append(
            {
                'english_word':row[0],
                'chinese_word':row[1],
                'list':row[2],
                'page':row[3]
            }
        )
    return  data