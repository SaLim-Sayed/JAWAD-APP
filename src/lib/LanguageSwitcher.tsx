
import { StyleSheet, View } from 'react-native';
import { useLanguage } from '../store';
import Button from '../components/UI/Button';

const LanguageSwitcher = () => {
  const { setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as 'en' | 'ar' | 'fr' | 'de');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          className="text-whiteColor-100"
          title="En"
          onPress={() => handleLanguageChange('en')}
        />
        <Button
          className="text-whiteColor-100"
          title="Ar"
          onPress={() => handleLanguageChange('ar')}
        />
        <Button
          className="text-whiteColor-100"
          title="Fr"
          onPress={() => handleLanguageChange('fr')}
        />
        <Button
          className="text-whiteColor-100"
          title="De"
          onPress={() => handleLanguageChange('de')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "none",
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LanguageSwitcher;
