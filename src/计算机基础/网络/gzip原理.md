# gzip 原理

gzip 使用了 LZ77 算法与 Huffman 编码来压缩文件，重复度越高的文件可压缩的空间就越大。

## 可以对图片开启 gzip 压缩吗，为什么

不需要开启，如果开启的话，有可能使图片变的更大。如果你注意一些网站的 img 资源时，就会发现他们都没有开启 gzip

[is-gzipping-images-worth-it-for-a-small-size-reduction-but-overhead-compressing](https://webmasters.stackexchange.com/questions/8382/is-gzipping-images-worth-it-for-a-small-size-reduction-but-overhead-compressing)
