import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      	<section className={styles.form}>
          <h1>Aborti</h1>
          <p>Sender (Leave blank for anonymous) </p>
          <input type="text" name="" id="" />
          <p>Message (Never leave blank)</p>
          <textarea name="" id=""></textarea>
          <button>Generate link!</button>
        </section>
    </>
  );
}
