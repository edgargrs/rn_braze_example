import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    marginVertical: 20,
    fontSize: 18,
    paddingHorizontal: 30,
    textAlign: 'center',
    color: 'black',
  },
  cardContainer: {
    backgroundColor: 'lightgrey',
    marginHorizontal: 30,
    width: '100%',
    marginVertical: 5,
    padding: 3,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'black',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
});
