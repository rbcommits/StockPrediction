import numpy as np
import pandas as pd
import math


def get_indicator(data, indicator):

    data_df = pd.DataFrame(data, columns=['<CLOSE>'])

    def ema(data, period=0, column='<CLOSE>'):
        data['ema' + str(period)] = data[column].ewm(ignore_na=False, min_periods=period, com=period, adjust=True).mean()

        return data


    def macd(data, period_long=26, period_short=12, period_signal=9, column='<CLOSE>'):
        remove_cols = []
        if not 'ema' + str(period_long) in data.columns:
            data = ema(data, period_long)
            remove_cols.append('ema' + str(period_long))

        if not 'ema' + str(period_short) in data.columns:
            data = ema(data, period_short)
            remove_cols.append('ema' + str(period_short))

        data['macd_val'] = data['ema' + str(period_short)] - data['ema' + str(period_long)]
        data['macd_signal_line'] = data['macd_val'].ewm(ignore_na=False, min_periods=0, com=period_signal,
                                                        adjust=True).mean()

        data = data.drop(remove_cols, axis=1)

        return data


    def rsi(data, periods=14, close_col='<CLOSE>'):
        data['rsi_u'] = 0.
        data['rsi_d'] = 0.
        data['rsi'] = 0.

        for index, row in data.iterrows():
            if index >= periods:

                prev_close = data.at[index - periods, close_col]
                if prev_close < row[close_col]:
                    data.set_value(index, 'rsi_u', row[close_col] - prev_close)
                elif prev_close > row[close_col]:
                    data.set_value(index, 'rsi_d', prev_close - row[close_col])

        data['rsi'] = data['rsi_u'].ewm(ignore_na=False, min_periods=0, com=periods, adjust=True).mean() / (
        data['rsi_u'].ewm(ignore_na=False, min_periods=0, com=periods, adjust=True).mean() + data['rsi_d'].ewm(
            ignore_na=False, min_periods=0, com=periods, adjust=True).mean())

        data = data.drop(['rsi_u', 'rsi_d'], axis=1)

        return data

    if indicator == "ema":
        ema_list = ema(data_df)["ema0"].tolist()
        ema_list = [0 if math.isnan(e) else e for e in ema_list]
        # print(ema_list[len(ema_list) - 1])
        return ema_list[len(ema_list) - 1]
    elif indicator == "macd":
        macd_list = macd(data_df)["macd_val"].tolist()
        macd_list = [0 if math.isnan(e) else e for e in macd_list]
        return macd_list[len(macd_list) - 1]
    else:
        rsi_list = rsi(data_df)["rsi"].tolist()
        rsi_list = [0 if math.isnan(e) else e for e in rsi_list]
        return rsi_list[len(rsi_list) - 1]




dummy = [i for i in range(28)]
get_indicator(dummy, "ema")
# EMA: "ema0"
# MACD: "macd_val" and "macd_signal_line"

# dummy = [i for i in range(28)]
# print(dummy)
# dummy_df = pd.DataFrame(dummy, columns=['<CLOSE>'])
# ema_df = ema(dummy_df)
#
# macd_df = macd(dummy_df)
#
# # print(ema_df['ema0'].tolist())
#
# macd_list = macd_df["macd_val"].tolist()
# macd_list = [0 if math.isnan(e) else e for e in macd_list]
# print(macd_list)
#
# macd_sig_list = macd_df["macd_signal_line"].tolist()
# macd_sig_list = [0 if math.isnan(e) else e for e in macd_list]
# print(macd_sig_list)
#
# rsi_df = rsi(dummy_df)
# print(rsi_df)