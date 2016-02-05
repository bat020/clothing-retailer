type Id    = Int
type Name  = String
type Tag   = String
type Money = Int

data Item  = Item { uid   :: Id
                  , name  :: Name
                  , tags  :: [Tag]
                  , price :: Money
                  , quant :: Int } deriving (Show)


-- basic list manipulation

transferItem :: [Item] -> [Item] -> Id -> ([Item], [Item])
transferItem source target idcode =
  (takeOut source idcode, putIn target $ getItem source idcode)

takeOut :: [Item] -> Id -> [Item]
takeOut [] _ = []
takeOut (item : rest) idcode
  | uid item /= idcode = item : takeOut rest idcode
  | quant item == 0 = item : rest
  | otherwise = item { quant = quant item - 1 } : rest

putIn :: [Item] -> Maybe Item -> [Item]
putIn items Nothing = items
putIn [] (Just new) = [new]
putIn (item : rest) (Just new)
  | uid item /= uid new = item : putIn rest (Just new)
  | otherwise = item { quant = quant item + 1 } : rest

getItem :: [Item] -> Id -> Maybe Item
getItem [] _ = Nothing
getItem (item:rest) idcode
  | uid item /= idcode = getItem rest idcode
  | quant item == 0 = Nothing
  | otherwise = Just $ item { quant = 1 }

stripZeros :: [Item] -> [Item]
stripZeros = filter $ (0 <) . quant


-- totals and vouchers

rawTotal :: [Item] -> Money
rawTotal = sum . map (\item -> price item * quant item)

voucher :: [Item] -> Money
voucher items
  | rawTotal items >= 7500 && hasTag "footwear" = 1500
  | rawTotal items >= 5000 = 1000
  | otherwise = 500
  where hasTag tag = (not . null) $ filter (tag ==) $ concatMap tags items

netTotal :: [Item] -> Money
netTotal items = rawTotal items - voucher items
