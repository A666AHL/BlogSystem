AC

```c++
void getNext(string ss, int *next)
{
	int j = 0, k = -1;
	next[0] = -1;
	while(j < ss.size() - 1) {
		if(k == -1 || ss[j] == ss[k] || ss[k] == '?') {
			j++;
			k++;
			next[j] = k;
		}
		else{
			k = next[k];
		}
	}
}
int kmp(string s, string ss)
{
	int len_s = s.size();
	int len_ss = ss.size();
	int i = 0, j = 0;
	int *next = new int[len_ss];
	getNext(ss, next);
	while(i < len_s) {
		if(j == -1 || s[i] == ss[j] ||ss[j] == '?') {	
			i++;
			j++;
		}
		else {
			j = next[j];	
		}
		if (j == len_ss)
			return i - len_ss;
	}
	return -1;
}
bool isMatch(string s, string p) {
	if(p == "*")
		return true; 
	int len_p = p.size();
	set<int> s_p {};
	for(int i = 0; i < len_p - 1; i++)
	{
		if(p[i] == '*')
			s_p.insert(i);
		if(p[i] == '*'&& p[i+1] == '*')
		{
			p.erase(i, 1);
			i--;
			len_p--;	
		}	
	} 
	if(p[len_p-1] == '*')
		s_p.insert(len_p-1);
	auto iter1 = s_p.begin();
	auto iter2 = s_p.end();
	int count = 0; // count *
	for(auto p = iter1; p != iter2; p++)
	{
		count++;
	}
	if(count == 0) {
		if(s == ""&& p =="")
			return true;
		else if(s == ""|| p == "")
			return false;
		else if(s.size() != p.size() || kmp(s, p) != 0) {
			return false;
		}
		else{
			return true;
		}
	}
	int len_s = s.size();
	int len_x = len_s - (len_p - count);	// * 代表的总长度 
	if(len_x < 0)
		return false;
	else{
		// 集合中*的index放入数组中
		int *index = new int [count]; 
		int i = 0; 
		for(auto p = iter1; p != iter2; p++)
		{
			index[i] = *p;
			i++;
		} 
		// 以 * 将 p 串分割为 不同的 子串 s1, s2, s3…… 
		// 如果首尾都有 *
		if(count > 1&& index[0] == 0&& index[count-1] == len_p-1)
		{
			if(count == 2)
			{
				p = p.erase(0, 1);
				p = p.erase(p.size() - 1, 1);
				if(kmp(s, p) != -1)
					return true;
				else
					return false;
			}
			string str {};
			str = p.substr(1, index[1] - 1);
			int index_sub = kmp(s, str);
			if(index_sub == -1)
				return false;
			else{
				p = p.erase(0, index[1]);
				s = s.erase(0, index_sub + str.size());
				return isMatch(s, p);
			}
		} 
		// 如果首有 *，尾没有 * 
		if(index[0] == 0&& index[count-1] != len_p-1) {
			if(count == 1)
			{
				string s1{s.rbegin(), s.rend()};
				p = p.erase(0, 1);
				string p1{p.rbegin(), p.rend()};
				if(kmp(s1, p1) == 0)
					return true;
				else
					return false;
			}
			else{ // 至少有两个 * 
				string temp = p.substr(index[count-1] + 1, len_p - 1 - index[count-1]);
				
				string temp1(temp.rbegin(), temp.rend());
				string s1(s.rbegin(), s.rend());
				
				int index_last = s.size() - 1 - (kmp(s1, temp1) + temp1.size() - 1);
				if(index_last == -1|| index_last + temp.size() != s.size())
				{
					return false;
				}
				else{
					s = s.erase(index_last, temp.size());
					p = p.erase(index[count-1] + 1, temp.size());
					return isMatch(s, p);
				}
			}
		}
		// 如果尾有 *，首没有 * 
		if(index[0] != 0&& index[count-1] == len_p-1) {
			if(count == 1)
		    {
		        if(kmp(s, p.erase(index[count-1], 1)) == 0)
		            return true;
		        else
		            return false;
		    }
		    else {
		    	string temp = p.substr(0, index[0]);
		    	int index_first = kmp(s, temp);
		    	if(index_first == -1|| index_first != 0)
		    	{
		    		return false;
				}
				else{
					s = s.erase(0, temp.size());
					p = p.erase(0, temp.size());
					return isMatch(s, p);  
				}
			}
		}
		// 如果首尾都没有 *
		if(index[0] != 0&& index[count-1] != len_p-1)
		{
			string temp1 = p.substr(0, index[0]);
			int index_first = kmp(s, temp1);
			string temp2 = p.substr(index[count-1] + 1, len_p - 1 - index[count-1]);
			
			string temp3(temp2.rbegin(), temp2.rend()); 
			string s1(s.rbegin(), s.rend());
			
			int index_last = s.size() - 1 - (kmp(s1, temp3) + temp3.size() - 1);	 
			if(index_last == -1|| index_first == -1|| index_first != 0|| index_last + temp2.size() != s.size())
			{
				return false;
			}
			s = s.erase(0, temp1.size());
            p = p.erase(0, temp1.size());
            s = s.erase(index_last - temp1.size(), temp2.size());
            p = p.erase(index[count-1] + 1 - temp1.size(), temp2.size());
            return isMatch(s, p);
		}
	} 
    return true;
}
```



```c++
mississippi m??*ss*?i*pi

#include<iostream>
#include<string>
#include<set>
using namespace std;
void getNext(string ss, int *next)
{
	int j = 0, k = -1;
	next[0] = -1;
	while(j < ss.size() - 1) {
		if(k == -1 || ss[j] == ss[k]) {
			j++;
			k++;
			next[j] = k;
		}
		else{
			k = next[k];
		}
	}
}
int kmp(string s, string ss)
{
	int len_s = s.size();
	int len_ss = ss.size();
	int i = 0, j = 0;
	int *next = new int[len_ss];
	getNext(ss, next);
	while(i < len_s) {
		if(j == -1 || s[i] == ss[j] ||ss[i] == '?') {	// 这里 i 应该改为 j 
			i++;
			j++;
		}
		else {
			j = next[j];	
		}
		if (j == len_ss)
			return i - len_ss;
	}
	return -1;
}
bool isMatch(string s, string p) {
	if(p == "*")
		return true; 
	int len_p = p.size();
	set<int> s_p {};
	for(int i = 0; i < len_p - 1; i++)
	{
		if(p[i] == '*')
			s_p.insert(i);
		if(p[i] == '*'&& p[i+1] == '*')
		{
			p.erase(i, 1);
			i--;
			len_p--;	
		}	
	} 
	if(p[len_p-1] == '*')
		s_p.insert(len_p-1);
	auto iter1 = s_p.begin();
	auto iter2 = s_p.end();
	int count = 0; // count *
	for(auto p = iter1; p != iter2; p++)
	{
		cout<<*p<<endl;
		count++;
	}
	cout<<"count="<<count<<endl;
	if(count == 0) {
		if(s == ""&& p =="")
			return true;
		else if(s == ""|| p == "")
			return false;
		else if(s.size() != p.size() || kmp(s, p) != 0) {
			return false;
		}
		else{
			return true;
		}
	}
	int len_s = s.size();
	int len_x = len_s - (len_p - count);	// * 代表的总长度 
	cout<<len_x<<endl;
	if(len_x < 0)
		return false;
	else{
		// 集合中*的index放入数组中
		int *index = new int [count]; 
		int i = 0; 
		for(auto p = iter1; p != iter2; p++)
		{
			index[i] = *p;
			i++;
		} 
		cout<<count<<" "<<index[count-1]<<endl;
		// 以 * 将 p 串分割为 不同的 子串 s1, s2, s3…… 
		// 如果首尾都有 *
		if(count > 1&& index[0] == 0&& index[count-1] == len_p-1)
		{
			if(count == 2)
			{
				p = p.erase(0, 1);
				p = p.erase(p.size() - 1, 1);
				if(kmp(s, p) != -1)
					return true;
				else
					return false;
			}
			string str {};
			str = p.substr(1, index[1] - 1);
			int index_sub = kmp(s, str);
			if(index_sub == -1)
				return false;
			else{
				p = p.erase(0, index[1]);
				s = s.erase(0, index_sub + str.size());
				return isMatch(s, p);
			}
//			for(int i = 1; i < count - 1; i++)
//			{
//				str[i] = p.substr(index[i] + 1, index[i+1] - index[i] - 1);
//				index_sub2 = kmp(s, str[i]);
//				if(index_sub2 == -1)
//					return false;
//				if(index_sub2 > index_sub1)
//				{
//					index_sub1 = index_sub2 + str[i].size() - 1;
//				}
//				else{
//					return false;
//				}
//			}
			return true;
		} 
		// 如果首有 *，尾没有 * 
		if(index[0] == 0&& index[count-1] != len_p-1) {
			if(count == 1)
			{
				if(kmp(s, p.erase(0, 1)) != -1)
					return true;
				else
					return false;
			}
			else{ // 至少有两个 * 
				string temp = p.substr(index[count-1] + 1, len_p - 1 - index[count-1]);
				
				string temp1(temp.rbegin(), temp.rend());
				string s1(s.rbegin(), s.rend());
				
				int index_last = s.size() - 1 - (kmp(s1, temp1) + temp1.size() - 1);
				if(index_last == -1|| index_last + temp.size() != s.size())
				{
					return false;
				}
				else{
					s = s.erase(index_last, temp.size());
					p = p.erase(index[count-1] + 1, temp.size());
					return isMatch(s, p);
				}
			}
		}
		// 如果尾有 *，首没有 * 
		if(index[0] != 0&& index[count-1] == len_p-1) {
			if(count == 1)
		    {
		        if(kmp(s, p.erase(count-1, 1)) != -1)
		            return true;
		        else
		            return false;
		    }
		    else {
		    	string temp = p.substr(0, index[0]);
		    	int index_first = kmp(s, temp);
		    	if(index_first == -1|| index_first != 0)
		    	{
		    		return false;
				}
				else{
					s = s.erase(0, temp.size());
					p = p.erase(0, temp.size());
					return isMatch(s, p);  
				}
			}
		}
		// 如果首尾都没有 *
		if(index[0] != 0&& index[count-1] != len_p-1)
		{
			cout<<count<<" "<<index[count-1]<<endl;
			string temp1 = p.substr(0, index[0]);
			int index_first = kmp(s, temp1);
			string temp2 = p.substr(index[count-1] + 1, len_p - 1 - index[count-1]);
			
			string temp3(temp2.rbegin(), temp2.rend()); 
			string s1(s.rbegin(), s.rend());
			
			int index_last = s.size() - 1 - (kmp(s1, temp3) + temp3.size() - 1);	// 这里最后不是这样 
			cout<<index_last<<endl;
			if(index_last == -1|| index_first == -1|| index_first != 0|| index_last + temp2.size() != s.size())
			{
				cout<<index_last + temp2.size()<<" "<<s.size()<<endl;
				cout<<"在这里出错"<<endl;
				return false;
			}
			s = s.erase(0, temp1.size());
            p = p.erase(0, temp1.size());
            s = s.erase(index_last - temp1.size(), temp2.size());
            p = p.erase(index[count-1] + 1 - temp1.size(), temp2.size());
            return isMatch(s, p);
		}
	} 
    return true;
}
int main()
{
	string s {};
	string p {};
	cin>>s>>p;
	cout<<isMatch(s, p)<<endl;
	return 0;
} 


if(count > 1&& index[0] == 0&& index[count-1] == len_p-1)
{
    string *str = new string [count-1];
    int index_sub1, index_sub2;
    str[0] = p.substr(index[0] + 1, index[1] - index[0] - 1);
    index_sub1 = kmp(s, str[0]) + str[0].size() - 1;
    if(index_sub1 == -1)
        return false;
    for(int i = 1; i < count - 1; i++)
    {
        str[i] = p.substr(index[i] + 1, index[i+1] - index[i] - 1);
        index_sub2 = kmp(s, str[i]);
        if(index_sub2 == -1)
            return false;
        if(index_sub2 > index_sub1)
        {
            index_sub1 = index_sub2 + str[i].size() - 1;
        }
        else{
            return false;
        }
    }
    return true;
} 
aaabaaabaabababbabababaababbabbbbaaaaababbaabbbaab
*babbbb*aab**b*bb*aa*
"aaabaaabaabababbabababaababbabbbbaaaaababbaabbbaab"
"*babbbb*aab**b*bb*aa*"
mississippi m??*ss*?i*pi
acdcd a*cd
if(index[0] != 0&& index[count-1] != len_p-1)
{
    cout<<count<<" "<<index[count-1]<<endl;
    string temp1 = p.substr(0, index[0]);
    int index_first = kmp(s, temp1);
    string temp2 = p.substr(index[count-1] + 1, len_p - 1 - index[count-1]);

    string temp3(temp2.rbegin(), temp2.rend()); 
    string s1(s.rbegin(), s.rend());

    int index_last = s.size() - 1 - (kmp(s1, temp3) + temp3.size() - 1);	// 这里最后不是这样 
    cout<<index_last<<endl;
    if(index_last == -1|| index_first == -1|| index_first != 0|| index_last + temp2.size() != s.size())
    {
        cout<<index_last + temp2.size()<<" "<<s.size()<<endl;
        cout<<"在这里出错"<<endl;
        return false;
    }
    s = s.erase(0, temp1.size());
    p = p.erase(0, temp1.size());
    s = s.erase(index_last, temp2.size());
    p = p.erase(index[count-1] + 1, temp2.size());
    return isMatch(s, p);
}
// 如果尾有 *，首没有 * 
if(index[0] != 0&& index[count-1] == len_p-1) {
    if(count == 1)
    {
        if(kmp(s, p.erase(count-1, 1)) != -1)
            return true;
        else
            return false;
    }
    else {
        string temp = p.substr(0, index[0]);
        int index_first = kmp(s, temp);
        if(index_first == -1|| index_first != 0)
        {
            return false;
        }
        else{
            s = s.erase(0, temp.size());
            p = p.erase(0, temp.size());
            return isMatch(s, p);  
        }
    }
}
if(index[0] == 0&& index[count-1] != len_p-1) {
    if(count == 1)
    {
        if(kmp(s, p.erase(0, 1)) != -1)
            return true;
        else
            return false;
    }
    else{ // 至少有两个 * 
        string temp = p.substr(index[count-1] + 1, len_p - 1 - index[count-1]);
        int index_last = kmp(s, temp);
        if(index_last == -1|| index_last + temp.size() != s.size())
        {
            return false;
        }
        else{
            s = s.erase(index_last, temp.size());
            p = p.erase(index[count-1], temp.size());
            return isMatch(s, p);
        }
    }
}
if(count > 1&& index[0] == 0&& index[count-1] == len_p-1)
{
    string *str = new string [count-1];
    int index_sub1, index_sub2;
    str[0] = p.substr(index[0] + 1, index[1] - index[0] - 1);
    index_sub1 = kmp(s, str[0]) + str[0].size() - 1;
    if(index_sub1 == -1)
        return false;
    for(int i = 1; i < count - 1; i++)
    {
        str[i] = p.substr(index[i] + 1, index[i+1] - index[i] - 1);
        index_sub2 = kmp(s, str[i]);
        if(index_sub2 == -1)
            return false;
        if(index_sub2 > index_sub1)
        {
            index_sub1 = index_sub2 + str[i].size() - 1;
        }
        else{
            return false;
        }
    }
    return true;
} 
if(count > 1&& index[0] == 0&& index[count-1] == len_p-1)
tstees1 **t**ee***y**
class Solution{
public:    
//重点在于求模式匹配串（即needle串）的next数组，表示当前位置前的串有i-1个前缀与后缀相同
//前缀是固定，后缀是相对的
    void getNext(string needle, int* next) {
        int j = 0, k = -1;
        next[0] = -1;//第一个无前缀，所以为-1
        while (j < needle.size() - 1) {
            if (k == -1 || needle[j] == needle[k]) { 
                j++;
                k++;
                next[j] = k;//k代表着0到j-1前缀最长的最后index
            }
            else {
                //在k失配时，k应该返回到当前k前缀最长的最后index=next[k]
                k = next[k];
            }
        }
    }
    int strStr(string haystack, string needle) {
        int len1 = haystack.size(), len2 = needle.size();
        int i=0,j=0;
        if (len2 == 0)
            return 0;
        int* next = new int[len2];
        getNext(needle, next);
        while (i < len1) {
            if (j == -1 || haystack[i] == needle[j]) {
                i++;
                j++;
            }
            else {
                j = next[j];//next为-1时，表示往回到needle[0]
            }
            if (j == len2) {
                return i - len2;
            }
        }
        return -1;
    }
};
for(i = 0; i < count; i++)
{
    cout<<index[i]<<endl;
}
#include<iostream>
#include<string>
#include<set>
using namespace std;
bool isMatch(string s, string p) {
	if(p=="")
		return false;
	p = "*" + p + "*";
//	cout<<p<<endl; // not used
	
	int count = 0;
	int len_p = p.size();
	// 将连续的"*"变成一个
	set<int> s_p {}; 
	for(int i = 0; i < len_p - 1; i++)
	{
		if(p[i] == '*'&& p[i+1] == '*')
		{
			p.erase(i, 1);
			// 把"*"的index加到一个集合里面 
			cout<<i<<endl;
			s_p.insert(i);
			i--;
			len_p--;
		}
	} 
	// 注意因为前后都加了一个'*'
	s_p.insert(len_p-1); 
	// 遍历集合s_p
	auto iter1 = s_p.begin();
	auto iter2 = s_p.end();
	int count_x = 0;	// count *	
	for(auto p = iter1; p != iter2; p++)
	{
		count_x++;
		cout<<*p<<endl;
	}
	int len_s = s.size();
	int len_x = len_s - (len_p - count_x);
	if(len_x < 0)
		return false;
	cout<<p<<endl;
//	for(int i = 0; i < len_p; i++)
//	{
//		if(p[i] == '*')
//			count++;
//	} 
    return true;
}
int main()
{
	string s {};
	string p {};
	cin>>s>>p;
	cout<<isMatch(s, p)<<endl;
	return 0;
} 
```



```c++
#include<iostream>
#include<string>
using namespace std;
bool isMatch(string s, string p) {
//    cout<<s<<" "<<p<<endl;// not used
	// ishave *
//	int len2 = p.size();
//	bool flag = false;
//	for(int i=0;i<len2;i++)
//	{
//		if(p[i]=='*')
//		{
//			flag=true;
//			break;
//		}
//	}
    return true;
}
int main()
{
	string s {};
	string p {};
	cin>>s>>p;
	cout<<isMatch(s, p)<<endl;
	return 0;
} 
```

