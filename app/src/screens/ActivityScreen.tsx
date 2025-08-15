import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';
import Input from '../components/ui/Input';

interface ActivityItem {
  id: string;
  type: 'deposit' | 'withdrawal' | 'goal_completed' | 'swap' | 'transfer_in' | 'transfer_out' | 'trust_update';
  title: string;
  subtitle: string;
  amount?: number;
  status: 'completed' | 'processing' | 'cancelled' | 'pending';
  date: Date;
  icon: string;
  iconColor: string;
}

interface ActivityGroup {
  title: string;
  activities: ActivityItem[];
}

const ActivityScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all_accounts']);

  // Mock activity data
  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'deposit',
      title: 'Emergency Fund',
      subtitle: 'Goal deposit',
      amount: 250.00,
      status: 'processing',
      date: new Date(),
      icon: '🏦',
      iconColor: '#3B82F6',
    },
    {
      id: '2',
      type: 'swap',
      title: 'BTC → USDC',
      subtitle: 'Crypto swap',
      amount: -0.01,
      status: 'completed',
      date: new Date(),
      icon: '🔄',
      iconColor: '#22C55E',
    },
    {
      id: '3',
      type: 'transfer_out',
      title: 'Rent Payment',
      subtitle: 'External transfer',
      amount: -1200.00,
      status: 'cancelled',
      date: new Date(Date.now() - 86400000), // Yesterday
      icon: '🏠',
      iconColor: '#EF4444',
    },
    {
      id: '4',
      type: 'goal_completed',
      title: 'Vacation Fund',
      subtitle: 'Goal completed',
      amount: 2500.00,
      status: 'completed',
      date: new Date(Date.now() - 86400000), // Yesterday
      icon: '🏆',
      iconColor: '#22C55E',
    },
    {
      id: '5',
      type: 'deposit',
      title: 'Car Savings',
      subtitle: 'Goal deposit',
      amount: 300.00,
      status: 'completed',
      date: new Date(Date.now() - 86400000), // Yesterday
      icon: '🚗',
      iconColor: '#3B82F6',
    },
    {
      id: '6',
      type: 'trust_update',
      title: 'Trust Score Update',
      subtitle: 'Monthly calculation',
      status: 'completed',
      date: new Date(Date.now() - 1296000000), // 15 days ago
      icon: '🛡️',
      iconColor: '#8B5CF6',
    },
    {
      id: '7',
      type: 'transfer_in',
      title: 'Salary Deposit',
      subtitle: 'Bank transfer',
      amount: 3500.00,
      status: 'completed',
      date: new Date(Date.now() - 1296000000), // 15 days ago
      icon: '💼',
      iconColor: '#22C55E',
    },
  ];

  // Filter options
  const filterOptions = [
    { id: 'all_accounts', label: 'All Accounts', active: true },
    { id: 'deposits', label: 'Deposits', active: false },
    { id: 'goals', label: 'Goals', active: false },
    { id: 'swaps', label: 'Swaps', active: false },
    { id: 'completed', label: 'Completed', active: false },
    { id: 'processing', label: 'Processing', active: false },
  ];

  // Group activities by date
  const groupActivitiesByDate = (activities: ActivityItem[]): ActivityGroup[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const groups: ActivityGroup[] = [];
    const activityMap = new Map<string, ActivityItem[]>();

    activities.forEach(activity => {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0);
      
      let groupKey: string;
      if (activityDate.getTime() === today.getTime()) {
        groupKey = 'Today';
      } else if (activityDate.getTime() === yesterday.getTime()) {
        groupKey = 'Yesterday';
      } else {
        groupKey = activityDate.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric' 
        });
      }

      if (!activityMap.has(groupKey)) {
        activityMap.set(groupKey, []);
      }
      activityMap.get(groupKey)!.push(activity);
    });

    // Convert map to array and sort
    activityMap.forEach((activities, title) => {
      groups.push({
        title,
        activities: activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      });
    });

    return groups.sort((a, b) => {
      if (a.title === 'Today') return -1;
      if (b.title === 'Today') return 1;
      if (a.title === 'Yesterday') return -1;
      if (b.title === 'Yesterday') return 1;
      return 0;
    });
  };

  const filteredActivities = mockActivities.filter(activity => {
    if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Add filter logic here based on selectedFilters
    return true;
  });

  const groupedActivities = groupActivitiesByDate(filteredActivities);

  const toggleFilter = (filterId: string) => {
    if (filterId === 'all_accounts') {
      setSelectedFilters(['all_accounts']);
    } else {
      setSelectedFilters(prev => {
        const newFilters = prev.filter(f => f !== 'all_accounts');
        if (prev.includes(filterId)) {
          return newFilters.filter(f => f !== filterId);
        } else {
          return [...newFilters, filterId];
        }
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22C55E';
      case 'processing': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getAmountColor = (amount?: number, status?: string) => {
    if (status === 'cancelled') return '#6B7280';
    if (!amount) return '#FFFFFF';
    return amount > 0 ? '#22C55E' : '#FFFFFF';
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return '';
    const prefix = amount > 0 ? '+' : '';
    return `${prefix}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const renderActivityItem = ({ item }: { item: ActivityItem }) => (
    <TouchableOpacity style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: item.iconColor + '20' }]}>
        <Text style={styles.activityIconText}>{item.icon}</Text>
      </View>
      
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          {item.amount && (
            <Text style={[styles.activityAmount, { color: getAmountColor(item.amount, item.status) }]}>
              {formatAmount(item.amount)}
            </Text>
          )}
        </View>
        
        <View style={styles.activityFooter}>
          <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
          <Text style={[styles.activityStatus, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterPill = (option: { id: string; label: string; active: boolean }) => {
    const isSelected = selectedFilters.includes(option.id);
    return (
      <TouchableOpacity
        key={option.id}
        style={[styles.filterPill, isSelected && styles.filterPillSelected]}
        onPress={() => toggleFilter(option.id)}
      >
        <Text style={[styles.filterPillText, isSelected && styles.filterPillTextSelected]}>
          {option.label}
        </Text>
        {isSelected && option.id !== 'all_accounts' && (
          <Ionicons name="close" size={16} color="#FFFFFF" style={styles.filterPillClose} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your activity</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={theme.colors.text.tertiary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search activity"
            placeholderTextColor={theme.colors.text.tertiary}
            selectionColor={theme.colors.border.focus}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Pills */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filterOptions.map(renderFilterPill)}
        </ScrollView>
      </View>

      {/* Activity Timeline */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {groupedActivities.map((group, index) => (
          <View key={group.title} style={styles.activityGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <FlatList
              data={group.activities}
              renderItem={renderActivityItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
    </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.primary,
  },
  filtersContainer: {
    marginBottom: 24,
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterPillSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  filterPillTextSelected: {
    color: '#FFFFFF',
  },
  filterPillClose: {
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  activityGroup: {
    marginBottom: 32,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityIconText: {
    fontSize: 24,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activitySubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  activityStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ActivityScreen;